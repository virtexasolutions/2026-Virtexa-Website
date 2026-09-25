import { Link } from "react-router-dom";
import {
  EmailLink,
  LegalDocument,
  LegalList,
  LegalSection,
  Strong,
} from "@/components/LegalDocument";
import { usePageSeo } from "@/lib/usePageSeo";

export default function Privacy() {
  usePageSeo({
    title: "Privacy Policy | Virtexa Solutions",
    description:
      "How Virtexa Solutions collects, uses, shares, and protects personal information, including text messaging, call recordings, and your privacy choices.",
    path: "/privacy",
  });

  return (
    <LegalDocument
      eyebrow="Legal"
      title="Privacy Policy"
      intro={
        <>
          <p>
            Virtexa Solutions ("Virtexa," "we," "us," or "our") builds and runs
            AI voice agents and automation systems for real estate
            professionals. This Privacy Policy explains how we collect, use,
            share, and protect personal information when you visit
            virtexasolutions.com, book a System Audit, use our chat assistant,
            receive calls or text messages from us, or otherwise interact with
            us.
          </p>
          <p>
            When our AI agents answer calls and send texts on behalf of our
            clients, we handle that information for those clients. Section 6
            explains how that works.
          </p>
        </>
      }
    >
      <LegalSection id="collect" title="1. Information We Collect">
        <p>
          <Strong>Information you give us.</Strong> When you book a System
          Audit, use our chat assistant, or contact us, we collect:
        </p>
        <LegalList
          items={[
            "Your name, email address, and phone number",
            "Business details, such as your team type, primary goals, and the CRM you currently use",
            "The date and time of the appointment you book",
            "Messages you send through our chat assistant, email, phone, or text",
          ]}
        />
        <p>
          <Strong>Information collected automatically.</Strong> Our website
          hosting provider and our font provider (Google Fonts) receive standard
          technical information needed to deliver the website, such as your IP
          address, browser type, device type, and the pages you request. We do
          not use advertising cookies or third-party analytics trackers on this
          website.
        </p>
        <p>
          <Strong>Information from clients.</Strong> When a business becomes a
          Virtexa client, we receive the information needed to build and run its
          services, such as business contact details, call scripts, calendars,
          and CRM access.
        </p>
      </LegalSection>

      <LegalSection id="use" title="2. How We Use Information">
        <p>We use personal information to:</p>
        <LegalList
          items={[
            "Schedule, confirm, remind you about, and hold your System Audit",
            "Respond to your questions and requests",
            "Prepare proposals, and set up, provide, and support our services",
            "Send service-related messages, such as confirmations, reminders, and account notices",
            "Send marketing messages about our services, where permitted by law and, for text messages, only with your consent",
            "Maintain the security of our website and services and prevent fraud or abuse",
            "Comply with legal obligations and enforce our agreements",
          ]}
        />
      </LegalSection>

      <LegalSection id="sms" title="3. Phone Calls and Text Messages">
        <p>
          If you give us your phone number, you agree that Virtexa may call and
          text you at that number about your appointment and your inquiry,
          including with automated technology and AI voice agents. Consent is
          not a condition of any purchase.
        </p>
        <LegalList
          items={[
            "Message frequency varies based on your appointment and conversation.",
            "Message and data rates may apply.",
            <>
              Reply <Strong>STOP</Strong> to any text to stop receiving texts,
              or <Strong>HELP</Strong> for help. You can also email{" "}
              <EmailLink />.
            </>,
            "Mobile carriers are not liable for delayed or undelivered messages.",
          ]}
        />
        <p>
          <Strong>
            We do not sell, rent, or share your mobile phone number or text
            messaging opt-in data with third parties or affiliates for their
            marketing or promotional purposes.
          </Strong>{" "}
          We share this information only with service providers that help us
          deliver messages and support our services. Text messaging opt-in data
          and consent are excluded from every other type of sharing described in
          this policy.
        </p>
      </LegalSection>

      <LegalSection id="chat" title="4. Our AI Chat Assistant">
        <p>
          Messages you send through the chat assistant on our website are
          processed by a third-party AI service provider to generate responses,
          and may be stored with your booking details. Please do not share
          sensitive personal information, such as financial account numbers or
          government ID numbers, in the chat.
        </p>
      </LegalSection>

      <LegalSection id="share" title="5. How We Share Information">
        <p>
          <Strong>We do not sell personal information</Strong>, and we do not
          share it for targeted advertising. We share personal information only:
        </p>
        <LegalList
          items={[
            <>
              <Strong>With service providers</Strong> who process it for us
              under contractual confidentiality and security obligations,
              including our scheduling and CRM platform, AI and speech
              providers, telephone and text messaging carriers, email providers,
              and our website host.
            </>,
            <>
              <Strong>For legal reasons</Strong>, when we believe it is required
              by law, legal process, or to protect the rights, safety, or
              property of Virtexa, our clients, or others.
            </>,
            <>
              <Strong>In a business transfer</Strong>, such as a merger,
              acquisition, or sale of assets, subject to this policy.
            </>,
            <>
              <Strong>With your consent</Strong> or at your direction.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection id="client-data" title="6. Data We Process for Our Clients">
        <p>
          Our clients are real estate agents, teams, and brokerages. When our AI
          agents answer calls, send missed-call text-backs, book appointments,
          or transfer calls for a client, we collect caller information on that
          client's behalf. This can include the caller's name, phone number,
          email, call recordings and transcripts, and details such as property
          interests, budget, timeline, and motivation. Calls are recorded and
          transcribed. We store this information in the client's CRM and
          systems.
        </p>
        <p>
          For this information, <Strong>the client decides</Strong> how it is
          used, and the client's own privacy policy applies. We process it only
          to provide and support the services for that client, as our agreement
          with the client requires. We do not sell it or use it to market our
          own services to the people who call our clients.
        </p>
        <p>
          If you contacted a real estate professional who uses Virtexa and want
          to access, correct, or delete your information, please contact that
          professional directly. We will help them respond.
        </p>
      </LegalSection>

      <LegalSection id="retention" title="7. How Long We Keep Information">
        <p>
          We keep personal information for as long as we need it for the
          purposes described in this policy, including to provide our services,
          maintain business records, resolve disputes, and meet legal, tax, and
          accounting obligations. We keep client data as our agreement with that
          client specifies, and delete or return it when that agreement ends,
          unless the law requires us to keep it.
        </p>
      </LegalSection>

      <LegalSection id="security" title="8. How We Protect Information">
        <p>
          We use reasonable administrative, technical, and physical safeguards
          to protect personal information, including access controls and
          encrypted connections. No method of transmission or storage is
          completely secure, so we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection id="rights" title="9. Your Choices and Rights">
        <LegalList
          items={[
            <>
              <Strong>Access, correction, and deletion:</Strong> you can ask for
              a copy of your personal information, or ask us to correct or
              delete it.
            </>,
            <>
              <Strong>Text messages:</Strong> reply STOP to any text from us to
              opt out.
            </>,
            <>
              <Strong>Email:</Strong> use the unsubscribe link in any marketing
              email, or email us.
            </>,
          ]}
        />
        <p>
          Depending on where you live, including Virginia, you may have
          additional rights under state privacy laws. We honor those rights as
          those laws require. To make a request, email <EmailLink /> with the
          subject "Privacy Request." We may need to verify your identity before
          we respond, and we will respond within 45 days. If we decline your
          request, you can appeal by replying to our decision. If you are not
          satisfied with the outcome of your appeal, you may contact your state
          Attorney General. We will not discriminate against you for exercising
          your rights.
        </p>
      </LegalSection>

      <LegalSection id="children" title="10. Children">
        <p>
          Our website and services are intended for business use by adults. They
          are not directed to anyone under 18, and we do not knowingly collect
          personal information from anyone under 18. If you believe a minor has
          given us personal information, contact us and we will delete it.
        </p>
      </LegalSection>

      <LegalSection id="location" title="11. United States Only">
        <p>
          Virtexa serves businesses in the United States, and we process and
          store information in the United States.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="12. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. When we do, we
          will change the effective date at the top of this page. If we make
          material changes, we will give additional notice, such as a notice on
          our website or an email to clients.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="13. Contact Us">
        <p>
          Questions or requests about this Privacy Policy can be sent to Virtexa
          Solutions, Arlington, Virginia, at <EmailLink />. See also our{" "}
          <Link
            to="/terms"
            className="text-[hsl(28,40%,76%)] underline underline-offset-2 hover:text-foreground"
          >
            Terms of Service
          </Link>
          .
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
