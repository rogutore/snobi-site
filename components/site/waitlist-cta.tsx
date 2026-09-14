import { FORM_URL } from "@/content/products";
export function WaitlistCTA({ en = false }: { en?: boolean }) {
  return (
    <section id="join" className="join-section">
      <p className="eyebrow">LET’S KEEP IN TOUCH</p>
      <h2 className="display">
        More good things
        <br />
        <em>to come.</em>
      </h2>
      <p>
        {en
          ? "News from SNöBI, and a place to start a conversation."
          : "SNöBIからのお知らせと、ご相談はこちら。"}
      </p>
      <a
        href={FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-link"
      >
        {en
          ? "Open the enquiry & updates form"
          : "お知らせ・お問い合わせフォームへ"}{" "}
        ↗
      </a>
      <p className="small-print">
        {en
          ? "The shared form asks for your company/store, contact name, email and interests. Choose launch updates for news."
          : "共通フォームで会社・店舗名、ご担当者名、メールアドレス、ご興味のある内容をご記入ください。お知らせは「発売案内のみ希望」をお選びください。"}
      </p>
    </section>
  );
}
