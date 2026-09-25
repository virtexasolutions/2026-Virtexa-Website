import { Link } from "react-router-dom";
import {
  EmailLink,
  LegalDocument,
  LegalList,
  LegalSection,
  Strong,
} from "@/components/LegalDocument";
import { usePageSeo } from "@/lib/usePageSeo";

const linkClass =
  "text-[hsl(28,40%,76%)] underline underline-offset-2 hover:text-foreground";

export default function Terms() {
  usePageSeo({
    title: "Terms of Service | Virtexa Solutions",
    description:
      "The terms that govern use of the Virtexa Solutions website and AI voice agent services for real estate professionals.",
    path: "/terms",
  });

  return (
    <LegalDocument
      eyebrow="Legal"
      title="Terms of Service"
      intro={
        <>
          <p>
            These Terms of Service ("Terms") are an agreement between you and
            Virtexa Solutions ("Virtexa," "we," "us," or "our"). They govern
            your use of virtexasolutions.com (the "Website") and the AI voice
            agent and automation services we provide (the "Services").
          </p>
          <p>
            If you and Virtexa have signed a proposal, order form, or statement
            of work (an "Order"), the Order is part of these Terms, and the
            Order controls if it conflicts with these Terms. By using the
            Website or Services, you agree to these Terms. If you accept them on
            behalf of a business, you confirm that you have authority to bind
            that business, and "you" means that business.
          </p>
        </>
      }
    >
      <LegalSection id="eligibility" title="1. Eligibility">
        <p>
          The Services are for businesses and real estate professionals in the
          United States. They are not offered to consumers for personal, family,
          or household use. You must be at least 18 years old to use the Website
          or Services.
        </p>
      </LegalSection>

      <LegalSection id="services" title="2. Our Services">
        <p>
          Virtexa builds and operates AI voice agents for real estate
          professionals. Depending on your plan and Order, the Services may
          include 24/7 AI call answering, live lead qualification, instant
          missed-call text-back, showing and appointment booking, a pipeline and
          follow-up automation build, and live warm transfer. Your plan, scope,
          fees, and timeline are set out in your Order.
        </p>
        <p>
          Launch timelines, such as going live within 10–14 days of kickoff, are
          estimates. They depend on you providing timely information, approvals,
          and access. Booking a System Audit does not obligate you to buy
          anything.
        </p>
      </LegalSection>

      <LegalSection id="fees" title="3. Fees and Payment">
        <p>
          Fees, billing frequency, and any usage charges are set out in your
          Order. Unless your Order says otherwise:
        </p>
        <LegalList
          items={[
            "Setup and build fees are due before work begins, and are non-refundable once the build has started.",
            "Monthly fees are billed in advance and are non-refundable for any partial month.",
            "Usage beyond what your plan includes is billed at the rates in your Order.",
            "Fees do not include taxes. You are responsible for any applicable taxes other than taxes on our income.",
          ]}
        />
        <p>
          If a payment is more than 15 days late, we may suspend the Services
          after giving you notice by email.
        </p>
      </LegalSection>

      <LegalSection
        id="responsibilities"
        title="4. Your Responsibilities and Compliance"
      >
        <p>
          You are responsible for how you use the Services and for the contacts,
          scripts, and content you provide. You agree to:
        </p>
        <LegalList
          items={[
            "Give us accurate information and the access we need to build and run your agent",
            "Comply with all laws that apply to your calls, texts, and marketing, including the Telephone Consumer Protection Act (TCPA), the Telemarketing Sales Rule, national and state Do-Not-Call rules, CAN-SPAM, state call recording laws, fair housing laws, and real estate licensing and advertising rules",
            "Obtain every consent the law requires before you, or the Services on your behalf, call or text any person, including any consent required for calls using AI-generated or artificial voices",
            "Give any notice that callers are being recorded, or are speaking with an AI agent, that the law requires where you or the caller is located. At your direction, we will configure a disclosure message for your agent.",
            "Honor opt-out and Do-Not-Call requests promptly",
            "Provide accurate business information for any carrier registration that business texting requires",
          ]}
        />
        <p>You may not use the Services to:</p>
        <LegalList
          items={[
            "Send spam, or call or text people without the consent the law requires",
            "Harass, deceive, or discriminate against anyone, including in violation of fair housing laws",
            "Upload contact lists that you do not have the right to use",
            "Break the law, infringe anyone's rights, or interfere with the Services or the networks they rely on",
            "Copy, reverse engineer, or resell the Services without our written permission",
          ]}
        />
      </LegalSection>

      <LegalSection id="ai" title="5. AI Agents and Their Limits">
        <p>
          Our AI agents are automated systems. They can misunderstand callers or
          give incomplete or inaccurate responses. They are not licensed real
          estate professionals, and they do not give legal, financial, lending,
          or tax advice.
        </p>
        <p>
          You remain responsible for your client relationships and business
          decisions. Please review your agent's scripts, call summaries, and
          bookings. We do not guarantee any particular result, such as a number
          of leads, appointments, closings, or revenue.
        </p>
      </LegalSection>

      <LegalSection id="third-party" title="6. Third-Party Services">
        <p>
          The Services rely on third-party providers, including telephone and
          text messaging carriers, AI and speech providers, and scheduling and
          CRM platforms. Their availability and performance, including carrier
          message filtering, are outside our control. We are not responsible for
          third-party services, and your use of them may also be subject to
          their own terms.
        </p>
      </LegalSection>

      <LegalSection id="sms" title="7. Text Messages from Virtexa">
        <p>
          If you give us your phone number, for example when you book a System
          Audit, you agree to receive calls and text messages from Virtexa about
          your appointment and inquiry, which may use automated technology.
          Consent is not a condition of any purchase. Message frequency varies,
          and message and data rates may apply. Reply <Strong>STOP</Strong> to
          opt out or <Strong>HELP</Strong> for help. Carriers are not liable for
          delayed or undelivered messages. See our{" "}
          <Link to="/privacy" className={linkClass}>
            Privacy Policy
          </Link>{" "}
          for how we handle your information.
        </p>
      </LegalSection>

      <LegalSection id="data" title="8. Your Data and Confidentiality">
        <p>
          <Strong>You own your data.</Strong> "Client Data" means the contacts,
          call recordings, transcripts, messages, and CRM records that you
          provide or that the Services create for you. You own your Client Data.
          You give us permission to use it only to provide, maintain, and
          support the Services for you, as described in our{" "}
          <Link to="/privacy" className={linkClass}>
            Privacy Policy
          </Link>
          .
        </p>
        <p>
          <Strong>Confidentiality.</Strong> Each of us will protect the other's
          non-public business information with reasonable care, and use it only
          for our relationship under these Terms.
        </p>
        <p>
          <Strong>When the Services end.</Strong> If you ask within 30 days
          after the Services end, we will give you an export of the Client Data
          held in systems we manage. After that, we may delete it.
        </p>
      </LegalSection>

      <LegalSection id="ip" title="9. Intellectual Property">
        <p>
          Virtexa and its licensors own the Website and the Services, including
          our software configurations, templates, script frameworks, workflows,
          and know-how. While the Services are active, we give you a
          non-exclusive, non-transferable right to use them for your internal
          business. If you send us feedback, we may use it without any
          obligation to you.
        </p>
      </LegalSection>

      <LegalSection id="term" title="10. Term, Suspension, and Termination">
        <p>
          The Services continue for the term in your Order. Unless your Order
          says otherwise, either of us may end month-to-month Services by giving
          30 days' written notice by email. Either of us may also end the
          Services if the other materially breaches these Terms and does not fix
          the breach within 30 days after written notice.
        </p>
        <p>
          We may suspend the Services immediately if we reasonably believe your
          use violates the law or these Terms, or creates a risk to others or to
          the Services. Fees owed before termination remain due. Sections 3, 5,
          and 8 through 15 survive termination.
        </p>
      </LegalSection>

      <LegalSection id="disclaimer" title="11. Disclaimers">
        <p>
          The Website and Services are provided "as is" and "as available." To
          the fullest extent the law allows, Virtexa disclaims all warranties,
          express or implied, including warranties of merchantability, fitness
          for a particular purpose, and non-infringement. We do not warrant that
          the Services will be uninterrupted or error-free, or that every call
          will be answered or every message delivered.
        </p>
      </LegalSection>

      <LegalSection id="liability" title="12. Limitation of Liability">
        <p>
          To the fullest extent the law allows, Virtexa will not be liable for
          any indirect, incidental, special, consequential, or punitive damages,
          or for any lost profits, revenue, commissions, business, or data.
          Virtexa's total liability for all claims related to these Terms or the
          Services is limited to the fees you paid to Virtexa in the 12 months
          before the event that gave rise to the claim.
        </p>
      </LegalSection>

      <LegalSection id="indemnity" title="13. Indemnification">
        <p>
          You will defend and indemnify Virtexa and its owners and team against
          claims, damages, fines, and costs, including reasonable attorneys'
          fees, that arise from your Client Data, your contact lists and
          consents, your use of the Services, or your violation of these Terms
          or any law, including the TCPA and Do-Not-Call rules.
        </p>
      </LegalSection>

      <LegalSection id="law" title="14. Governing Law and Disputes">
        <p>
          These Terms are governed by the laws of the Commonwealth of Virginia,
          without regard to its conflict-of-laws rules. Before filing a claim,
          each of us agrees to try to resolve the dispute informally for 30 days
          after written notice. Any lawsuit must be brought only in the state or
          federal courts serving Arlington County, Virginia, and each of us
          consents to those courts' jurisdiction.
        </p>
      </LegalSection>

      <LegalSection id="general" title="15. General Terms">
        <LegalList
          items={[
            "We may update these Terms. When we do, we will change the effective date above, and we will notify active clients of material changes by email. Continuing to use the Services after changes take effect means you accept them.",
            "These Terms and your Order are the entire agreement between us about their subject.",
            "If any part of these Terms is unenforceable, the rest remains in effect.",
            "Not enforcing a provision is not a waiver of it.",
            "You may not assign these Terms without our consent. We may assign them in a merger, acquisition, or sale of assets.",
            "Neither of us is liable for delays caused by events beyond our reasonable control.",
            "Notices may be sent by email to the addresses on file.",
          ]}
        />
      </LegalSection>

      <LegalSection id="contact" title="16. Contact Us">
        <p>
          Questions about these Terms can be sent to Virtexa Solutions,
          Arlington, Virginia, at <EmailLink />.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
