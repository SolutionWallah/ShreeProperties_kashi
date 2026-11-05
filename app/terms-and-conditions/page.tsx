import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Terms & Conditions | Shree Property Kashi",
  description: "Terms and Conditions for using the Shree Property Kashi website.",
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <SiteHeader />
      <main className="legal-page">
        <div className="shell legal-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <span>Terms &amp; Conditions</span>
          </nav>
          <h1>
            Terms &amp; <em className="accent">Conditions</em>
          </h1>
          <p className="legal-updated">Last updated: November 5, 2026</p>
          <p>
            These Terms and Conditions govern your use of the Shree Property Kashi website. By using
            this website, you agree to follow these terms. If you do not agree, please do not use
            the website.
          </p>
          <h2>Website information</h2>
          <p>
            Property listings, prices, availability, photographs, descriptions, and other
            information are provided for general guidance. Details may change without notice, and we
            do not guarantee that every listing is complete, current, or error-free.
          </p>
          <h2>Property enquiries</h2>
          <p>
            Submitting an enquiry does not reserve a property, create a contract, or guarantee a
            transaction. Any sale, lease, rental, or other arrangement is subject to separate
            written terms agreed by the relevant parties.
          </p>
          <h2>Your responsibilities</h2>
          <p>When using this website, you agree to:</p>
          <ul>
            <li>Provide accurate information when contacting us.</li>
            <li>Use the website only for lawful purposes.</li>
            <li>
              Not copy, misuse, disrupt, or attempt to gain unauthorised access to the website.
            </li>
            <li>Independently verify property details before making a decision.</li>
          </ul>
          <h2>Professional and legal verification</h2>
          <p>
            Information on this website is not legal, financial, tax, surveying, or construction
            advice. Before completing a transaction, you should carry out appropriate due diligence
            and obtain independent advice regarding title, permissions, documents, taxes, financing,
            and other applicable requirements.
          </p>
          <h2>Intellectual property</h2>
          <p>
            Unless otherwise stated, website content, branding, text, graphics, and photographs
            belong to or are used by Shree Property Kashi and may not be reproduced or redistributed
            without permission.
          </p>
          <h2>Third-party services and links</h2>
          <p>
            We may provide links or contact options through third-party services. We are not
            responsible for the availability, content, or policies of those external services.
          </p>
          <h2>Limitation of liability</h2>
          <p>
            To the extent permitted by law, Shree Property Kashi is not responsible for loss
            resulting from reliance on website information, interruptions, technical issues, or
            third-party content. Nothing in these terms excludes liability that cannot legally be
            excluded.
          </p>
          <h2>Changes and contact</h2>
          <p>
            We may update these terms from time to time by publishing a revised version on this
            page. For questions, contact us at <a href="tel:+919889028504">+91 98890 28504</a> or{" "}
            <a href="tel:+917903512516">+91 79035 12516</a>.
          </p>
        </div>
      </main>
    </>
  );
}
