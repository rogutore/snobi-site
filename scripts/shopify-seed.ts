import { createHash } from "node:crypto";
import { format } from "prettier";
import { writeFileSync, existsSync, readFileSync } from "node:fs";
import { products } from "../content/products";
import { connectAdmin } from "./shopify-admin";

type Variant = {
  id: string;
  sku: string;
  title: string;
  price: string;
  selectedOptions: { name: string; value: string }[];
  inventoryItem: {
    id: string;
    tracked: boolean;
    inventoryLevel: {
      id: string;
      quantities: { name: string; quantity: number }[];
    } | null;
  };
};
type Product = {
  id: string;
  handle: string;
  vendor: string;
  tags: string[];
  variants: { nodes: Variant[] };
  media: {
    nodes: {
      id: string;
      alt: string;
      preview: { image: { url: string } | null } | null;
    }[];
  };
  resourcePublications: {
    nodes: {
      isPublished: boolean;
      publication: { id: string; name: string };
    }[];
  };
};
async function main() {
  const { query } = await connectAdmin();
  const preflight = await query<{
    currentAppInstallation: {
      app: { id: string };
      accessScopes: { handle: string }[];
      publication: { id: string; name: string } | null;
    };
    shop: { currencyCode: string; taxesIncluded: boolean };
    locations: {
      nodes: {
        id: string;
        name: string;
        isActive: boolean;
        fulfillsOnlineOrders: boolean;
      }[];
    };
    publications: {
      nodes: {
        id: string;
        name: string;
        app: { id: string; title: string } | null;
      }[];
    };
  }>(
    `{currentAppInstallation { app { id } accessScopes { handle } publication { id name } } shop { currencyCode taxesIncluded } locations(first:30){nodes{id name isActive fulfillsOnlineOrders}} publications(first:100){nodes{id name app{id title}}}}`,
  );
  const scopes = preflight.currentAppInstallation.accessScopes.map(
    (s) => s.handle,
  );
  for (const scope of [
    "write_products",
    "write_publications",
    "write_inventory",
    "read_locations",
    "read_shipping",
  ])
    if (!scopes.includes(scope))
      throw new Error(`STOP — missing scope ${scope}`);
  if (preflight.shop.currencyCode !== "JPY" || !preflight.shop.taxesIncluded)
    throw new Error("Expected tax-inclusive JPY shop");
  const own = preflight.publications.nodes.find(
    (p) => p.app?.id === preflight.currentAppInstallation.app.id,
  );
  const online = preflight.publications.nodes.find(
    (p) => p.name === "Online Store",
  );
  if (!online) throw new Error("Online Store publication is missing");
  // Hybrid brief authorizes Online Store; the app has no publication on this installation.
  const publications = [online, ...(own ? [own] : [])];
  if (!own)
    console.log(
      "App publication absent; using authorized Online Store publication.",
    );
  const locations = preflight.locations.nodes.filter(
    (l) => l.isActive && l.fulfillsOnlineOrders,
  );
  if (locations.length !== 1)
    throw new Error("Default fulfillment location is ambiguous");
  const locationId = locations[0].id;
  console.log(
    "Preview publication:",
    publications.map((p) => `${p.name} ${p.id}`).join(", "),
    "Location:",
    locations[0].name,
  );
  const oldCollection = await query<{
    collections: { nodes: { id: string; handle: string }[] };
  }>('query {collections(first:20,query:"handle:snobi"){nodes{id handle}}}');
  let collection = oldCollection.collections.nodes.find(
    (c) => c.handle === "snobi",
  );
  if (!collection) {
    const d = await query<{
      collectionCreate: { collection: { id: string; handle: string } };
    }>(
      'mutation {collectionCreate(input:{title:"SNöBI",handle:"snobi"}){collection{id handle} userErrors{field message}}}',
    );
    collection = d.collectionCreate.collection;
    console.log("Created manual collection", collection.id);
  }
  const productFields = `id handle vendor tags variants(first:100){nodes{id sku title price selectedOptions{name value} inventoryItem{id tracked inventoryLevel(locationId:"${locationId}"){id quantities(names:["available"]){name quantity}}}}} media(first:30){nodes{id alt preview{image{url}}}} resourcePublications(first:100){nodes{isPublished publication{id name}}}`;
  for (const p of products) {
    let found = (
      await query<{ products: { nodes: Product[] } }>(
        `query Find($q:String!){products(first:10,query:$q){nodes{${productFields}}}}`,
        { q: `handle:${p.handle}` },
      )
    ).products.nodes.find((x) => x.handle === p.handle);
    if (found && found.vendor !== "SNöBI")
      throw new Error(
        `Unexpected vendor for ${p.handle}; refusing to overwrite`,
      );
    const isNew = !found;
    const previousPublications = new Set(
      found?.resourcePublications.nodes
        .filter((r) => r.isPublished)
        .map((r) => r.publication.id) || [],
    );
    if (
      found &&
      (found.variants.nodes.length !== 2 ||
        found.variants.nodes.some(
          (v) => !p.variants.some((w) => w.sku === v.sku),
        ))
    )
      throw new Error(
        `Unexpected variants for ${p.handle}; refusing a destructive sync`,
      );
    const input = {
      ...(found ? { id: found.id } : {}),
      title: `SNöBI ${p.title.ja}`,
      handle: p.handle,
      vendor: "SNöBI",
      productType: "Coffee",
      status: "ACTIVE",
      tags: [
        ...new Set([
          ...(found?.tags || []).filter((tag) => tag !== "placeholder-price"),
          "snobi",
          "chapter-one",
        ]),
      ],
      descriptionHtml: `<p>${p.title.ja} / ${p.title.en}</p><p>Organic whole-bean coffee. ${p.notes.en.join(" · ")}</p><p>${[p.region.ja, p.process.ja, p.producer.ja, p.elevation].filter(Boolean).join(" / ")}</p>`,
      productOptions: [
        {
          name: "Size",
          position: 1,
          values: p.variants.map((v) => ({ name: v.size })),
        },
      ],
      variants: p.variants.map((v) => ({
        ...(found
          ? { id: found.variants.nodes.find((w) => w.sku === v.sku)!.id }
          : {}),
        optionValues: [{ optionName: "Size", name: v.size }],
        price: String(v.price),
        taxable: true,
        inventoryPolicy: "DENY",
        inventoryItem: {
          sku: v.sku,
          tracked: true,
          requiresShipping: true,
          measurement: {
            weight: { value: v.size === "100g" ? 100 : 200, unit: "GRAMS" },
          },
        },
      })),
    };
    const data = await query<{ productSet: { product: Product } }>(
      `mutation Seed($input:ProductSetInput!){productSet(input:$input,synchronous:true){product{${productFields}} userErrors{field message}}}`,
      { input },
    );
    found = data.productSet.product;
    console.log(
      isNew ? "Created product" : "Updated product",
      p.handle,
      found.id,
    );
    for (const v of p.variants) {
      const actual = found.variants.nodes.find((w) => w.sku === v.sku)!;
      v.id = actual.id;
      // Initialize only new inventory levels. Never reset stock to 100 on reruns.
      if (!actual.inventoryItem.inventoryLevel) {
        await query(
          "mutation Activate($item:ID!,$location:ID!,$key:String!){inventoryActivate(inventoryItemId:$item,locationId:$location,available:100) @idempotent(key:$key){inventoryLevel{id} userErrors{field message}}}",
          {
            item: actual.inventoryItem.id,
            location: locationId,
            key: createHash("sha256")
              .update(`snobi-initial-activation:${actual.inventoryItem.id}`)
              .digest("hex"),
          },
        );
        console.log("PLACEHOLDER inventory initialized at 100:", v.sku);
      } else if (
        isNew ||
        process.argv.includes(
          `--initialize-product=${found.id.split("/").pop()}`,
        )
      ) {
        const current =
          actual.inventoryItem.inventoryLevel.quantities.find(
            (q) => q.name === "available",
          )?.quantity ?? 0;
        await query(
          "mutation Stock($input:InventorySetQuantitiesInput!,$key:String!){inventorySetQuantities(input:$input) @idempotent(key:$key){inventoryAdjustmentGroup{createdAt} userErrors{field message}}}",
          {
            key: createHash("sha256")
              .update(`snobi-initial-stock:${actual.inventoryItem.id}`)
              .digest("hex"),
            input: {
              name: "available",
              reason: "correction",
              referenceDocumentUri: `snobi://preview/seed/${v.sku}`,
              quantities: [
                {
                  inventoryItemId: actual.inventoryItem.id,
                  locationId,
                  quantity: 100,
                  changeFromQuantity: current,
                },
              ],
            },
          },
        );
        console.log("PLACEHOLDER inventory set to 100:", v.sku);
      } else console.log("Preserved existing inventory:", v.sku);
    }
    const membership = await query<{ collection: { hasProduct: boolean } }>(
      "query Membership($id:ID!,$product:ID!){collection(id:$id){hasProduct(id:$product)}}",
      { id: collection.id, product: found.id },
    );
    if (!membership.collection.hasProduct) {
      await query(
        "mutation Add($id:ID!,$products:[ID!]!){collectionAddProducts(id:$id,productIds:$products){collection{id} userErrors{field message}}}",
        { id: collection.id, products: [found.id] },
      );
    }
    console.log("Ensured collection membership:", p.handle);
    for (const publication of publications) {
      if (
        !found.resourcePublications.nodes.some(
          (r) => r.isPublished && r.publication.id === publication.id,
        )
      ) {
        await query(
          "mutation Publish($id:ID!,$input:[PublicationInput!]!){publishablePublish(id:$id,input:$input){publishable{availablePublicationsCount{count}} userErrors{field message}}}",
          { id: found.id, input: [{ publicationId: publication.id }] },
        );
        console.log("Published to", publication.name, p.handle);
      }
    }
    // Re-run with ASSET_BASE_URL set after preview deployment, using the public immutable URL.
    const assetBase = process.env.ASSET_BASE_URL;
    if (assetBase) {
      const media = p.variants
        .filter(
          (v) =>
            existsSync(`public/products/${p.handle}-${v.size}.jpg`) &&
            !found!.media.nodes.some(
              (m) =>
                m.alt === `SNöBI ${p.title.en} ${v.size} — preview composite`,
            ),
        )
        .map((v) => ({
          mediaContentType: "IMAGE",
          alt: `SNöBI ${p.title.en} ${v.size} — preview composite`,
          originalSource: `${assetBase}/products/${p.handle}-${v.size}.jpg`,
        }));
      if (media.length) {
        await query(
          "mutation Images($product:ProductUpdateInput!,$media:[CreateMediaInput!]){productUpdate(product:$product,media:$media){product{id} userErrors{field message}}}",
          { product: { id: found.id }, media },
        );
        console.log("Queued product images:", p.handle, media.length);
      }
    } else
      console.log(
        "Images deferred until ASSET_BASE_URL is available:",
        p.handle,
      );
    const uploaded = await query<{
      product: {
        media: { nodes: { id: string; alt: string; status: string }[] };
      };
    }>(
      "query Images($id:ID!){product(id:$id){media(first:30){nodes{id alt status}}}}",
      { id: found.id },
    );
    const imageVariants = p.variants.flatMap((v) => {
      const media = uploaded.product.media.nodes.find(
        (m) =>
          m.status === "READY" &&
          m.alt === `SNöBI ${p.title.en} ${v.size} — preview composite`,
      );
      return media ? [{ id: v.id, mediaId: media.id }] : [];
    });
    if (imageVariants.length) {
      await query(
        "mutation MatchImages($id:ID!,$variants:[ProductVariantsBulkInput!]!){productVariantsBulkUpdate(productId:$id,variants:$variants){productVariants{id} userErrors{field message}}}",
        { id: found.id, variants: imageVariants },
      );
      console.log(
        "Matched ready images to sizes:",
        p.handle,
        imageVariants.length,
      );
    }
    // Product updates can trigger auto-publish channels too. Preserve intentional
    // existing publications and remove only extra channels added by this seed run.
    const current = await query<{
      product: Pick<Product, "resourcePublications">;
    }>(
      "query Publications($id:ID!){product(id:$id){resourcePublications(first:100){nodes{isPublished publication{id name}}}}}",
      { id: found.id },
    );
    const extra = current.product.resourcePublications.nodes.filter(
      (r) =>
        r.isPublished &&
        !previousPublications.has(r.publication.id) &&
        !publications.some((p) => p.id === r.publication.id),
    );
    for (const r of extra) {
      // Catalog-level removal is required here: publishableUnpublish returned
      // success while the automatic Meta/Copilot publications remained active.
      await query(
        "mutation LimitCatalog($id:ID!,$input:PublicationUpdateInput!){publicationUpdate(id:$id,input:$input){publication{id} userErrors{field message}}}",
        { id: r.publication.id, input: { publishablesToRemove: [found.id] } },
      );
      const check = await query<{
        product: { publishedOnPublication: boolean };
      }>(
        "query VerifyPublication($id:ID!,$publication:ID!){product(id:$id){publishedOnPublication(publicationId:$publication)}}",
        { id: found.id, publication: r.publication.id },
      );
      if (check.product.publishedOnPublication)
        throw new Error(
          `Extra channel still published: ${p.handle} / ${r.publication.name}`,
        );
      console.log(
        "Removed automatic extra-channel publication:",
        p.handle,
        r.publication.name,
      );
    }
    const file = "content/products.ts";
    const source = readFileSync(file, "utf8");
    const start = source.indexOf("export const products: Coffee[] = ");
    const end = source.indexOf("\nexport const minimumPrice", start);
    const updated = await format(
      source.slice(0, start) +
        "export const products: Coffee[] = " +
        JSON.stringify(products, null, 2) +
        ";" +
        source.slice(end),
      { parser: "typescript" },
    );
    if (updated !== source) writeFileSync(file, updated);
  }
  console.log(
    "Seed completed. Default shipping profile untouched; no menus changed. Final prices applied. Inventory remains a placeholder.",
  );
}
main().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
