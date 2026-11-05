import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Privacy Policy | Shree Property Kashi",
  description: "Privacy Policy for Shree Property Kashi.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="legal-page">
        <div className="shell legal-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <span>Privacy Policy</span>
          </nav>
          <h1>
            Privacy <em className="accent">Policy</em>
          </h1>
          <p className="legal-updated">Last updated: November 5, 2026</p>
          <p>
            Shree Property Kashi respects your privacy. This Privacy Policy explains how we collect,
            use, and protect information when you visit our website or contact us about a property.
          </p>
          <h2>Information we collect</h2>
          <p>
            We may receive information that you provide directly, such as your name, phone number,
            email address, and the details of your property enquiry. We may also receive basic
            technical information, such as your browser type and the pages you visit.
          </p>
          <h2>How we use your information</h2>
          <p>We use enquiry information to:</p>
          <ul>
            <li>Respond to your questions and property requests.</li>
            <li>Arrange viewings or provide relevant property information.</li>
            <li>Improve our website and services.</li>
            <li>Protect the security and integrity of our website.</li>
          </ul>
          <h2>Sharing of information</h2>
          <p>
            We do not sell your personal information. We may share information with property owners,
            service providers, or professional advisers only when reasonably necessary to respond to
            your request, provide our services, or comply with the law.
          </p>
          <h2>Data retention and security</h2>
          <p>
            We retain information only for as long as it is needed for the purposes described here
            or as required by law. We take reasonable administrative and technical measures to
            protect information, but no online transmission or storage method can be guaranteed to
            be completely secure.
          </p>
          <h2>Your choices</h2>
          <p>
            You may ask us to update or delete personal information you have provided, subject to
            applicable legal and business requirements. You can also choose not to provide
            information, although this may limit our ability to help with an enquiry.
          </p>
          <h2>Third-party links</h2>
          <p>
            Our website may link to third-party services, including WhatsApp. Their privacy
            practices are governed by their own policies, and we encourage you to review them.
          </p>
          <h2>Contact us</h2>
          <p>
            For privacy questions or requests, contact Shree Property Kashi at{" "}
            <a href="tel:+919889028504">+91 98890 28504</a> or{" "}
            <a href="tel:+917903512516">+91 79035 12516</a>.
          </p>
        </div>
      </main>
    </>
  );
}
