# SNöBI — photo requests along our real supply chain (drafts, not sent)

Rewritten 2026-10-08 (owner: "request from our supplier and potentially their supplier or the exporter/importer or the
farm, NOT from a random company we are not purchasing from"). Replaces the 2026-10-05 drafts (git `50a981b`), which led
with Sucafina — a company we have never bought from.

Evidence: order/invoice mail in info@tokyocoffee.jp, invoices and certificates in Drive (`My Drive/SNOBI/`, vendor
folders), public web pages. Marks: VERIFIED (source named) / INFERRED / UNKNOWN.

**Status 2026-10-09 (owner: "Shouldn't we ask farms first/simultaneously? There is no conflict there. Write up emails to each of the
farms and exporters if they are clear. Save drafts for the version we discussed to our vendors in info drafts."):**
- **Six Gmail drafts saved in info@tokyocoffee.jp (not sent):** #1 矢野様, #2 鈴木様, #3 コーヒー流通センター, #4 田久保様, #8 CAC La
  Prosperidad de Chirinos (ES + EN), #9 Café Colsuaves (ES + EN). The drafts are the current text; sections below are the 2026-10-08 record.
- Changes from the 2026-10-08 text: farms/exporters are asked **at the same time** as the vendors, not after; #1 and #3 now tell the vendor
  we are writing to the co-op / exporter directly; #8/#9 no longer CC the vendor and name the vendor we buy through; `[共有フォルダURL]` is
  replaced by "reply with attachments or a GigaFile/Google Drive link". Still to fill: `[氏名]` / `[Nombre]` (who signs).
- **SENT 2026-10-09 (owner: "send the farms and exporter emails"):** #8 → gerencia@cac-laprosperidad.com (Gmail id 1a11e7281e6f6047),
  #9 → info@colsuaves.com (1a11e729e1ab2ebe), from info@, signed "Equipo de Tokyo Coffee / SNöBI" (no named signer yet). Their two Gmail
  drafts are still in Drafts: delete them by hand so nobody sends them twice. Replies: Gmail filter (from either domain → label
  "Noah/SNöBI 産地写真", star, important, never spam) + scheduled task `snobi-origin-photo-replies` (09:00 and 18:00 daily; notifies
  Noah, logs below under "Replies log"). No bounce as of sending.
- **Not drafted (contact not clear, 2026-10-09 search):** Tade GG / Tesfaye Bekele (two Gmail addresses appear only in a search summary, not
  on a page; go through 小川珈琲 / the importer), Cooperativa El Bombo itself (directory phone only; reached via Colsuaves), GRAPOS (no email;
  site fails), Agroindustrias Unidas de México (phones only), Descamex (plant unconfirmed). #5 健友交易 not drafted (decaf switch undecided).
- The purchasing-team questions below are still open but no longer block sending (owner).

**Status 2026-10-08: ON HOLD — confirm with the purchasing team before anything is sent (owner).** Questions for them:
1. Are the four vendors in §1 the ones SNöBI's beans come from (not other stock of the same origin)?
2. Colombia: is SNöBI roasted only from コーヒー流通センター 7005A, never from the むそう Colombia?
3. Decaf: when the オリジン lot 1121 runs out, does SNöBI decaf switch to the 健友 lot (016/2222/0722), or do we keep some オリジン stock? **Answered 2026-10-13 (owner): the 健友 decaf is a different, non-specialty product; SNöBI stays on the オリジン / GRAPOS line.** #5 健友交易 is dropped.
4. Who should sign each email (the person who orders from that vendor)?

## 1. Who we actually buy from (the chain, farm → our vendor)

| Lot | Farm / producer | Exporter | Importer into Japan | **Our vendor (we pay them)** |
|---|---|---|---|---|
| Peru Chirinos Geisha washed G1 | Miguel Esteban Ramírez Agurto, CAC La Prosperidad de Chirinos | the co-op exports itself (VERIFIED, cac-laprosperidad.com) | UNKNOWN (not on the vendor's pages) | **株式会社坂ノ途中 海ノ向こうコーヒー事業部**. VERIFIED: orders 17720944740 (2026-02-26) and 17852069205 (2026-07-28), 30 kg each, item U899-260K300-0, ¥4,720/kg |
| Ethiopia Guji G1 Tade GG natural | Tade GG farm, Tesfaye Bekele | Tade GG PLC, Tesfaye's own export company (VERIFIED, slurp.coffee) | probably 丸紅 (INFERRED: Marubeni's coffee report names Tade GG and "Mr. Tasfaye") | **小川珈琲株式会社**. VERIFIED: web-shop order 11122 (2026-05-19, 5 kg, ¥2,944/kg), orders 11382 and 13272 (60 kg each); JAS certificate addressed to us 2026-06-05 |
| Colombia Huila organic | Cooperativa de Caficultores El Bombo – Núcleo 2 (Pitalito) | Café Colsuaves S.A.S., Pereira (VERIFIED: organic certificate) | 双日食料 (VERIFIED: organic certificate) | **コーヒー流通センター（清光コーヒー株式会社）**. VERIFIED: item 7005A 「コロンビア ウイラ 有機栽培（麻袋）」, order E-226200 (2026-01-21, 4 × 30 kg), 124015068047 (2026-07-22, 1 × 30 kg). That our Drive certificate (lot 3/0104/00023) is theirs: INFERRED (they mailed the certificate + product sheet 2026-07-28; same product, 30 kg bags) |
| Mexico Chiapas organic decaf ("Honey Chiapas" HG EP) | GRAPOS co-op smallholders, Chiapas | Agroindustrias Unidas de México, Beneficio Seco Dos Ríos, Veracruz, named as seller on the transaction certificate (VERIFIED: `JAS Decaf Mexico#1121.pdf`); decaf plant Descamex per our spec sheet only (UNKNOWN which is right) | **ECOM JAPAN LTD** (consignee on the same certificate, VERIFIED) | **オリジンコーヒートレーダーズジャパン株式会社**. VERIFIED: invoices D11811 (2026-07-14) and D12140 (2026-09-02), 120 kg each at ¥2,270/kg; web order #31696 (2026-09-17), 120 kg of lot 1121 at ¥2,340/kg |

**Sucafina is not in any of our chains** (no order, invoice or mail with Sucafina, Trabocca or Colsuaves in any mailbox or
Drive folder). Sucafina Japan is a one-person sales office for Sucafina SA, not an importer (VERIFIED,
group.sucafina.com/network/sucafina-japan). Sucafina does trade the same producers in other markets: Chirinos (Miguel's
Geisha, via its North American arm Sustainable Harvest), Tade GG (EU, NA, APAC) and El Bombo (buyer + co-funder of the
"Women in Coffee" programme). **It owns the Tade GG photos we hold** (`DSCF6643/6751/6762`, `Tesfaye Bekele Owner of Tade
GG.jpg` sit on Sucafina's image server), and **snobi.jp shows one of them today** (`/producers/tesfaye.jpg` on
/origins/ethiopia-guji, VERIFIED 2026-10-08). So Sucafina gets one honest email (§5), not the lead role.

**Two things that change products, not just emails:**
- **Decaf supplier changes from October.** On 2026-09-18 we contracted 健友交易 for MWP decaf, lot 016/2222/0722, Oct 2026–Jan
  2027, ¥2,330/kg (VERIFIED, mail). Its producer and plant are UNKNOWN. The exporter code 2222 matches the OCT lot
  016-2222-1121, so the same Mexican exporter is likely (INFERRED). **Owner decision:** keep SNöBI decaf on the OCT/GRAPOS
  stock, or switch it to the 健友 lot once its facts are known (then the Mexico page changes).
- **Our bulk Colombia (むそう商事, 35 kg, lots 3/265/00130 and 003-0354-00691) is a different coffee.** SNöBI Colombia must be
  roasted from the コーヒー流通センター 7005A stock only, or the El Bombo facts on the site are wrong.

## 2. How to send

- **Order:** step 1 = our vendors (§3). Step 2 = their importers/exporters (§4), only after the vendor replies OK or
  introduces us, and with the vendor in CC. Sucafina (§5) is separate and can go any time.
- **From:** info@tokyocoffee.jp (where all supplier mail lives), signed by whoever usually orders from that vendor.
- **Fill in:** `[氏名]`, `[連絡先]`, `[共有フォルダURL]` (suggested Drive `RTU/premium-line/origin-media/<origin>/` — owner OK
  needed to create it).
- Ask for photos first; video/drone is one "by the way" line. No stock or generated footage will stand in for a farm
  (DESIGN.md: real photography only).

| # | To | Address (source) | Step |
|---|---|---|---|
| 1 | 海ノ向こうコーヒー 矢野 翔大様 | yanos@on-the-slope.com, TEL 075-205-5380 (his signature) | 1 |
| 2 | 小川珈琲 鈴木 晴人様（第1営業部 業務2課） | h-suzuki@oc-ogawa.co.jp, Tokyo office 03-5464-1531 (his signature) | 1 |
| 3 | コーヒー流通センター | coffee@cafe.co.jp, 0823-27-5071 (their mail) | 1 |
| 4 | オリジンコーヒートレーダーズ 田久保様 | info@origincoffeetradersjp.com, 03-4400-9505 (their mail) | 1 |
| 5 | 健友交易 千本様 | shinkenyu.2020@gmail.com, 072-804-0050 (their mail) | 1, only if the owner wants the decaf switch option |
| 6 | 双日食料 コーヒーご担当 | form https://www.sofco.sojitz.com/inquiry/products/input.html (official site) | 2, after #3 |
| 7 | ECOM JAPAN | ask 田久保様 for the contact (#4) | 2, after #4 |
| 8 | CAC La Prosperidad de Chirinos | gerencia@cac-laprosperidad.com, +51 959 904 263 (cac-laprosperidad.com/contacto) | 2, after #1 |
| 9 | Café Colsuaves (El Bombo's exporter) | info@colsuaves.com (colsuaves.com) | 2, after #3/#6 |
| 10 | Descamex | contacto@descamex.com.mx (descamex.com.mx) | HOLD until #4 confirms the decaf plant |
| 11 | Sucafina (Japan / APAC) | salesasia@sucafina.com (sucafina.com/apac/About/Team); Japan office +81 3 6871 8607; MD Japan & Korea Felice Chay | any time |

Ethiopia's and Peru's importers are not known yet; when 鈴木様 / 矢野様 name them, reuse #6 with the names swapped. Tade GG
PLC has no working public address, so go through the importer.

---

## 3. Step 1 — our vendors

### #1 海ノ向こうコーヒー（坂ノ途中）

件名：ペルー チリノス ゲイシャ（U899-260K300-0）— 写真のご提供と産地へのご紹介のお願い

矢野様

いつもお世話になっております。株式会社ローグトレード（Tokyo Coffee）の[氏名]です。
2月と7月にご注文したチリノス組合 ゲイシャ ウォッシュ G1（U899-260K300-0）を、新ライン「SNöBI」（https://snobi.jp）で販売しております。

産地ページ（https://snobi.jp/origins/peru）を充実させたく、3点ご相談させてください。

1. 写真のご提供
ミゲルさん、農園、チリノスの写真をお持ちでしたら、高解像度データをお送りいただけますでしょうか。
snobi.jp・SNS・印刷物での使用許諾と、ご希望のクレジット表記もあわせてお知らせください。

2. 掲載中の写真の確認
現在、ミゲルさんのお写真を1点掲載しております。貴社の商品資料にあったものと認識しておりますが、使用に問題がないかご確認いただけますでしょうか。

3. 産地へのつながり
このロットの輸出・輸入の流れを教えていただけますか。チリノス組合に直接写真をお願いしてもよろしければ、ご紹介いただけると大変助かります。貴社のご迷惑にならない形で進めます。

ちなみに、農園の空撮（ドローン）や動画もお持ちでしたら、ぜひ拝見したいです。

送付先：[共有フォルダURL]
よろしくお願いいたします。

[氏名]
株式会社ローグトレード（Tokyo Coffee / SNöBI）[連絡先]

---

### #2 小川珈琲

件名：エチオピア グジ タデGG農園 ナチュラル — 写真と輸入元についてのご相談（SNöBI）

鈴木様

いつもお世話になっております。株式会社ローグトレード（Tokyo Coffee）の[氏名]です。
グジ G1 タデGG農園 ナチュラルを、新ライン「SNöBI」（https://snobi.jp）で販売しております。

産地ページ（https://snobi.jp/origins/ethiopia-guji）について、ご相談させてください。

1. 写真のご提供
タスファイ・ベケレ氏や農園の写真をお持ちでしたら、高解像度データと、snobi.jp・SNS・印刷物での使用許諾、ご希望のクレジット表記をお願いできますでしょうか。
現在掲載している写真は貴社経由のものではないため、差し替えたいと考えております。

2. 輸入元
このロットの輸入元（商社）を教えていただけますか。お手元に写真がない場合は、輸入元へのご紹介か、ご依頼の取り次ぎをお願いできれば幸いです。

3. 確認2点
・「GG」は「Green Gold」の意味で合っていますか。
・標高は1,800〜2,200mで掲載してよろしいでしょうか。

ちなみに、空撮（ドローン）や動画もあれば、ぜひ拝見したいです。

送付先：[共有フォルダURL]
よろしくお願いいたします。

[氏名]
株式会社ローグトレード（Tokyo Coffee / SNöBI）[連絡先]

---

### #3 コーヒー流通センター（清光コーヒー）

件名：コロンビア ウイラ 有機栽培（7005A）— 資料の掲載と輸入元へのご連絡について

コーヒー流通センター ご担当者様

いつもお世話になっております。株式会社ローグトレード（Tokyo Coffee）の[氏名]です。
7005A「コロンビア ウイラ 有機栽培（麻袋）」を、新ライン「SNöBI」（https://snobi.jp）で販売しております。
7月28日には有機証明書と商品資料をお送りいただき、ありがとうございました。画像のご用意がないことも承知いたしました。

1. 資料の掲載
資料にある生産者名・標高・品種・精製などの情報を、snobi.jpの産地ページと印刷物に掲載してもよろしいでしょうか。

2. ロットの確認
現在の在庫は LOT 3/0104/00023（生産 Cooperativa de Caficultores El Bombo、輸出 Café Colsuaves、輸入 双日食料）で合っていますか。

3. 生産者の写真
生産者組合の写真を、輸入元の双日食料様にお願いしたいと考えております。直接ご連絡してもよろしいでしょうか。ご紹介いただけるようでしたら、なお助かります。

よろしくお願いいたします。

[氏名]
株式会社ローグトレード（Tokyo Coffee / SNöBI）[連絡先]

---

### #4 オリジンコーヒートレーダーズ

件名：メキシコ チアパス グラポス デカフェ（#1121）— 写真と産地情報のお願い（SNöBI）

田久保様

いつもお世話になっております。株式会社ローグトレード（Tokyo Coffee）の[氏名]です。
【デカフェ有機栽培】メキシコ チアパスHG EP グラポス（ロット1121）を、新ライン「SNöBI」（https://snobi.jp）で販売しております。

産地ページ（https://snobi.jp/origins/mexico-chiapas-decaf）について、ご相談させてください。

1. 写真のご提供
グラポスの生産者・農園、デカフェ工程の写真をお持ちでしたら、高解像度データと、snobi.jp・SNS・印刷物での使用許諾、ご希望のクレジット表記をお願いできますでしょうか。

2. 産地情報の確認
・デカフェ処理は Descamex社（マウンテンウォーター）で合っていますか。証明書では Agroindustrias Unidas de México（Beneficio Seco Dos Ríos）のお名前を拝見しました。
・組合員数「3,253名（うち女性832名）」で掲載してよろしいでしょうか。

3. 輸入元へのご紹介
証明書の荷受人は ECOM JAPAN様でした。お手元に写真がない場合、ECOM JAPAN様をご紹介いただくか、ご連絡先を教えていただけますでしょうか。

ちなみに、空撮（ドローン）や動画もあれば、ぜひ拝見したいです。

送付先：[共有フォルダURL]
よろしくお願いいたします。

[氏名]
株式会社ローグトレード（Tokyo Coffee / SNöBI）[連絡先]

---

### #5 健友交易（only if the owner wants the decaf switch option)

件名：MWPデカフェ（LOT 016/2222/0722）— 産地情報と資料のお願い

千本様

いつもお世話になっております。株式会社ローグトレード（Tokyo Coffee）の[氏名]です。
9月にご契約いただいたMWPデカフェ（LOT 016/2222/0722、10月〜1月）について、ご相談です。

このデカフェを、新ライン「SNöBI」（https://snobi.jp）でも使う可能性があります。
産地ページに載せるため、次の情報と資料をいただけますでしょうか。
・生産者（農協・農園）、地域、標高、品種、精製
・デカフェ工場（Descamex社のマウンテンウォーターかどうか）
・有機JAS証明書（通関後で構いません）
・生産者や工程の写真（あれば、高解像度データと使用許諾・クレジット表記）

よろしくお願いいたします。

[氏名]
株式会社ローグトレード（Tokyo Coffee / SNöBI）[連絡先]

---

## 4. Step 2 — importers and origin (after the vendor's OK; CC the vendor)

### #6 双日食料（product inquiry form）

件名：コロンビア ウィラ 有機（El Bombo / Café Colsuaves）— 生産者写真のお願い

双日食料株式会社 コーヒーご担当者様

突然のご連絡、失礼いたします。株式会社ローグトレード（Tokyo Coffee）の[氏名]です。
貴社が輸入されたコロンビア ウィラ 有機栽培（生産 Cooperativa de Caficultores El Bombo、輸出 Café Colsuaves、LOT 3/0104/00023）を、コーヒー流通センター様（清光コーヒー）から購入し、新ライン「SNöBI」（https://snobi.jp）で販売しております。コーヒー流通センター様には、ご連絡することをお伝えしております。

産地ページを充実させたく、生産者組合・農園の写真をお持ちでしたら、高解像度データと、snobi.jp・SNS・印刷物での使用許諾、ご希望のクレジット表記をいただけますでしょうか。
お手元にない場合は、Café Colsuaves様へのご紹介でも大変助かります。

よろしくお願いいたします。

[氏名]
株式会社ローグトレード（Tokyo Coffee / SNöBI）[連絡先]

### #7 ECOM JAPAN

Use #6 with: 「メキシコ チアパス 有機 デカフェ（GRAPOS、ロット 016-2222-1121）を、オリジンコーヒートレーダーズ様から購入し…」 and ask for GRAPOS
and decaf-process photos; mention 田久保様 knows we are writing.

### #8 CAC La Prosperidad de Chirinos (ES, EN below)

Asunto: SNöBI (Tokyo Coffee, Japón) — Fotos de Chirinos y de Miguel Ramírez

Estimado equipo de la Cooperativa La Prosperidad de Chirinos:

Les escribe [Nombre] de Rogutore Co., Ltd. (Tokyo Coffee), en Tokio. Compramos el Geisha lavado de **Miguel Esteban
Ramírez Agurto** a través de 海ノ向こうコーヒー (Sakanotochu Co., Kioto), que está en copia, y lo vendemos en nuestra
línea **SNöBI** (https://snobi.jp/origins/peru).

¿Podrían enviarnos fotos en alta resolución de la finca de Miguel y de Chirinos, con su autorización para usarlas en
snobi.jp, redes sociales y material impreso? Por favor indíquennos cómo desean que los mencionemos.

Por cierto, si tienen tomas con dron o videos, nos encantaría verlos.

Archivos: [enlace de carpeta compartida]

Muchas gracias,
[Nombre]
Rogutore Co., Ltd. (Tokyo Coffee / SNöBI)

> **EN:** We buy Miguel Ramírez Agurto's washed Geisha through Uminomukou Coffee (Sakanotochu, Kyoto; in CC) and sell it
> in Japan under SNöBI. Could you send high-res photos of his farm and Chirinos, with permission to use them on snobi.jp,
> social media and print, and tell us how you'd like to be credited? By the way, if you have drone or video footage,
> we'd love to see it.

### #9 Café Colsuaves / Cooperativa El Bombo (ES, EN below)

Asunto: SNöBI (Tokyo Coffee, Japón) — Fotos de la Cooperativa El Bombo

Estimados:

Les escribe [Nombre] de Rogutore Co., Ltd. (Tokyo Coffee), en Tokio. Vendemos en nuestra línea **SNöBI**
(https://snobi.jp/origins/colombia-huila) el café orgánico de la **Cooperativa de Caficultores El Bombo – Núcleo 2**
(Pitalito, Huila), exportado por ustedes e importado a Japón por Sojitz Foods (双日食料).

¿Podrían enviarnos fotos en alta resolución de las fincas y de los productores, con su autorización para usarlas en
snobi.jp, redes sociales y material impreso, y el crédito que prefieran? ¿Y podemos presentarlos como «Cooperativa de
Caficultores El Bombo (antes ASOBOMBO)»?

Por cierto, si tienen tomas con dron o videos, nos encantaría verlos.

Archivos: [enlace de carpeta compartida]

Muchas gracias,
[Nombre]
Rogutore Co., Ltd. (Tokyo Coffee / SNöBI)

> **EN:** We sell El Bombo – Núcleo 2's organic coffee in Japan under SNöBI; you export it and Sojitz Foods imports it.
> Could you send high-res photos of the farms and growers with permission for web/social/print use and your preferred
> credit, and may we present them as "El Bombo coffee growers' cooperative (formerly ASOBOMBO)"? By the way, if you have
> drone or video footage, we'd love to see it.

### #10 Descamex — HOLD until 田久保様 confirms the decaf plant

If confirmed, send the 2026-10-05 draft (git `50a981b`, §7) with one change in the first paragraph: «Compramos el
descafeinado orgánico de Chiapas (GRAPOS) a través de Origin Coffee Traders Japan…».

---

## 5. Sucafina — not in our chain (any time)

To: salesasia@sucafina.com — Attn. Felice Chay, Managing Director Japan & Korea (Sucafina Japan, +81 3 6871 8607)

Subject: Tade GG, Chirinos and El Bombo — photo permission, and a question about buying from you

Dear Felice Chay,

I'm [Name] at Rogutore Co., Ltd. (Tokyo Coffee), a roaster in Tokyo. Our new line SNöBI (https://snobi.jp) sells three
coffees from producers you also work with: Tade GG (Tesfaye Bekele), Miguel Ramírez Agurto's Geisha from Prosperidad de
Chirinos, and the El Bombo cooperative. We buy them through Japanese suppliers, and we don't know whether Sucafina is
anywhere in those chains.

Three things:

1. **Your Tesfaye Bekele portrait.** Our Ethiopia page used your photo "Tesfaye Bekele Owner of Tade GG" from
   sucafina.com. We should have asked first, and we're sorry. [We have taken it down. / It is still up.] May we use it,
   and how would you like it credited?
2. **Marketing materials.** Would you share photos (and video, such as the El Bombo "Women in Coffee" film) of these
   producers that we may use on snobi.jp, social media and print, with credit?
3. **Buying from you.** If any of these lots, or similar organic (JAS) specialty lots, can be bought through Sucafina for
   delivery to Japan, we'd like to see your offer list.

Best regards,
[Name]
Rogutore Co., Ltd. (Tokyo Coffee / SNöBI) [contact]

> **Before sending:** decide the bracket in point 1. Recommended: take `/producers/tesfaye.jpg` off live snobi.jp first
> (needs the owner's OK for a production change), then send with "We have taken it down."

## Replies log

- 2026-10-16 SENT from info@ (Sharon, as ベネディクト), all threaded: 小川 鈴木様 (names in photo ①, credit 「写真提供：小川珈琲」, scope incl. Amazon, importer); OCT 田久保様 (thanks; usage + credit stated, no question on cropping per owner); コーヒー流通センター (yes, please ask 双日 for El Bombo photos; we won't contact 双日); Café Colsuaves follow-up ES/EN; Sucafina Japan (SalesJapan@sucafina.com, address from a search listing, UNVERIFIED) license request for Tade GG / Chirinos / El Bombo photos and films. Sharon's own reply to 矢野さん 10:05 (accepts Peru washed 6 t at ¥1,880/kg; photo paragraph suggested, inclusion UNKNOWN). Watch for replies; record each here.
- 2026-10-15 (logged) replies received 10-13..10-14, photos saved by staff in Drive `My Drive/SNOBI/<origin>/`:
  - **小川珈琲 鈴木様 (Ethiopia, 10-13, after phoning Sharon):** 8 photos (2560×1701 webp) → `Ethiopia Tade GG Guji Natural/Photos/From 小川珈琲/`: two men under a tree (#1, names not given), forest, sorting on African beds, beds ×3, cherries in sacks, canopy. Confirmed 標高 1,800〜2,200m. **GG = Guji Girga (place near the farm), not "Green Gold"; Tade = the name of founder Tesfaye's elder brother.** Not answered: usage scope / credit wording, importer, who is in #1.
  - **オリジンコーヒートレーダーズ 田久保様 (Mexico decaf, 10-13):** 7 photos via firestorage → `Decaf Mexico Honey Chiapas/Photos from Origin Coffee Traders/` (coffee flowers, farm, village street, drying patio with a farmer, wet mill, forest ×2; two are 855px). **"販促用途としてご使用いただいて差し支えございません。※写真の二次加工はご遠慮いただいております。"** Confirmed: Descamex Mountain Water; Agroindustrias Unidas de México = JAS-certified handler (精選・選別・保管・出荷), not the decaf plant; members 3,253 (women 832) may be published. No video.
  - **コーヒー流通センター (Colombia 7005A, 10-14):** documents may be published; lot 3/0104/00023 confirmed; **do not contact 双日食料 and no introduction**, but their own staff can ask 双日 for us (our call). No photos.
  - **海ノ向こうコーヒー 矢野様 (Peru, 10-14, reply to Sharon's 10-14 mail):** no photos yet (SCAJ week). Commercial: Geisha new crop Feb 2027, ~130 bags, ¥4,900/kg 税込 any quantity; Peru Chirinos washed new crop Feb 2027, up to 200 bags (6 t) at ¥1,880/kg 税込 incl. shipping + free storage **only if confirmed by Tue 2026-10-20**.
  - Still none: CAC La Prosperidad de Chirinos, Café Colsuaves (sent 10-09). Also 10-13: OCT order #32448, 60 kg decaf lot 1121 at ¥2,340/kg (lot 1121 continues).
- 2026-10-13 (owner) 小川珈琲 (Ethiopia vendor) **phoned Sharon** in reply to our 10-09 email: they can get us some photos soon. No email yet. Sharon also answers 矢野さん's next-season Chirinos quantity question (owner 2026-10-12).
- Still no reply (as of 2026-10-13, info@ searched): コーヒー流通センター (7005A), オリジンコーヒートレーダーズ 田久保様 (decaf), CAC La Prosperidad de Chirinos, Café Colsuaves. No bounces.
- 2026-10-11 (received 2026-10-09 16:39 JST) 坂ノ途中 / 海ノ向こうコーヒー, 矢野翔大 (yanos@on-the-slope.com), replying to our JP Chirinos Geisha request (not the CAC co-op): will gather photos and share them later via Google Drive; photos in their product sheets and on their website are free to use; drone footage may be hard but will provide what they can; no credit line stated; asks whether we will continue with next season's Chirinos new crop and in what quantity (they must offer to origin). Gmail id 1a11f9a89342e775.
