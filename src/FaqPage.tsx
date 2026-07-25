import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { WhatsAppIcon } from './components/WhatsAppIcon';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQAccordionItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(13, 20, 26, 0.08)', padding: '16px 0' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', padding: '8px 0', cursor: 'pointer', textAlign: 'left', color: 'var(--color-text-primary)', fontWeight: '600', fontSize: '16px', fontFamily: 'inherit' }}
      >
        <span>{question}</span>
        <span style={{ color: 'var(--color-surface-raised)', marginLeft: '12px', display: 'inline-flex', alignItems: 'center' }}>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      
      {isOpen && (
        <div style={{ padding: '8px 0 16px 0', color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
          {answer}
        </div>
      )}
    </div>
  );
}

interface FaqPageProps {
  navigateTo: (page: string) => void;
}

export function FaqPage({ navigateTo }: FaqPageProps) {
  const [activeTopic, setActiveTopic] = useState<string>('ordering');

  const topics = [
    { id: 'ordering', name: 'Ordering & Quotes' },
    { id: 'artwork', name: 'Customization & Artwork' },
    { id: 'materials', name: 'Products & Materials' },
    { id: 'delivery', name: 'Production & Delivery' },
    { id: 'oem', name: 'OEM & White-Label' },
    { id: 'payment', name: 'Payment, Invoicing & GST' },
    { id: 'quality', name: 'Quality & Support' }
  ];

  const faqData: Record<string, FAQItemProps[]> = {
    ordering: [
      {
        question: 'How do I get pricing or a quote?',
        answer: 'You can add products to your Request for Quote (RFQ) list directly on our storefront, specify quantities, and submit it. Our procurement team will review and email you a formal GST quotation within 2 business hours. Alternatively, send details directly to sales@ortexindustries.in or via WhatsApp.'
      },
      {
        question: 'What is your Minimum Order Quantity (MOQ)?',
        answer: 'Our standard production MOQ is 50 units per design for CNC-machined metal items, acrylic badges, and custom lanyards. For smaller sample runs or prototyping requests, setup tooling fees apply.'
      },
      {
        question: 'Can I order a product that is not in your catalogue?',
        answer: 'Yes! We are direct makers with in-house CAD programmers, CNC routing machines, and laser engraving lines. If you have a specific metal or acrylic design, share your tech specifications, and we will quote a custom fabrication run.'
      },
      {
        question: 'Can I combine different products or colours in one order?',
        answer: 'Yes, you can mix items to meet your volume targets. However, each unique engraving logo or color swap requires a brief machine reset, which may influence unit setup costs.'
      },
      {
        question: 'How do I place and confirm an order?',
        answer: 'To confirm an order: (1) sign off on our digital CAD branding proof, and (2) pay a 50% production deposit. The remaining 50% balance is payable prior to cargo dispatch from our New Delhi factory.'
      }
    ],
    artwork: [
      {
        question: 'What design and logo file formats do you accept?',
        answer: 'For precision laser engraving and UV printing, we require high-resolution vector files: .AI, .EPS, .SVG, .DXF, or print-ready vector-PDF. Text elements should be converted to curves/outlines to avoid font conflicts.'
      },
      {
        question: 'I don\'t have print-ready artwork. Can you help?',
        answer: 'Yes, our in-house design engineering team can format, scale, and place your corporate logo onto our digital product layout mockups at no extra cost for confirmed orders.'
      },
      {
        question: 'Do you match specific brand colours?',
        answer: 'For UV printing, we map PMS (Pantone Matching System) values as closely as possible using our flatbed printers. For anodized aluminum and acrylic plates, we offer standard industrial colors (Black, Space Grey, Silver, Rose Gold, Royal Blue, Forest Green).'
      },
      {
        question: 'What printing and finishing methods do you use?',
        answer: 'We utilize fiber laser marking (high-contrast etching), CNC milling, rotary tooling engraving, HD flatbed UV curing, silk-screening, and metal stamp embossing.'
      },
      {
        question: 'Will I see a proof before production?',
        answer: 'Always. We do not run any machinery until you sign off on a digital CAD mockup proof. For wholesale runs exceeding 1,000 units, physical pre-production prototype samples can be shipped for approval.'
      },
      {
        question: 'Can you produce fully custom shapes, sizes, and materials?',
        answer: 'Yes. We cut custom acrylic components, route custom-shaped MDF boards, and mill metals to specifications using our multi-axis routers.'
      }
    ],
    materials: [
      {
        question: 'What products do you manufacture?',
        answer: 'We produce premium CNC-milled corporate gifts (titanium card holders, brass hex pens, steel desk organizers), acrylic items (badges, signage), lanyards, and custom MDF giveaway boards.'
      },
      {
        question: 'What materials do you work with?',
        answer: 'We machine aerospace-grade aluminum, brass, stainless steel, acrylic plates, graded MDF wood, premium woven lanyards, and leatherette accents.'
      },
      {
        question: 'Can I get plain or unbranded products?',
        answer: 'Yes. We supply blank stock to laser shops, agencies, and distributors at wholesale factor rates.'
      }
    ],
    delivery: [
      {
        question: 'What are your standard lead times?',
        answer: 'CAD mockup approvals take 24 hours. Physical samples take 2-3 days. Standard bulk production runs take 7 to 12 days depending on order size. Insured logistics transit adds 2-5 days.'
      },
      {
        question: 'Do you deliver across India?',
        answer: 'Yes, we coordinate surface and air express cargo shipments to all PIN codes in India through top logistics partners (BlueDart, Delhivery, SafeExpress).'
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Yes, we regularly ship worldwide and provide export documentations (HS code declarations, commercial invoicing, custom clearances).'
      },
      {
        question: 'Who handles packaging and shipping?',
        answer: 'We wrap all custom orders in padded individual packaging and crate them securely. Shipping fees are added to your invoice at cost, or dispatched freight-collect via your courier account.'
      },
      {
        question: 'Do you offer rush or express production?',
        answer: 'Yes, depending on machine capacity and material stock, we can expedite runs for a setup surcharge to hit tight corporate event dates.'
      }
    ],
    oem: [
      {
        question: 'Do you offer OEM and white-label manufacturing?',
        answer: 'Yes. We manufacture white-label goods for gift agencies, corporate resellers, and design brands. We can pack products in neutral shipping boxes.'
      },
      {
        question: 'Will the products carry any Ortex branding?',
        answer: 'No. OEM products carry only your company\'s logo or custom details. Shipping labels and packages are neutral.'
      },
      {
        question: 'Can resellers, agencies, and other brands order from you?',
        answer: 'Yes, corporate gift distributors, marketing agencies, and wholesale traders receive direct maker-to-reseller volume discount structures.'
      },
      {
        question: 'Do you keep our designs and projects confidential?',
        answer: 'Always. We sign strict Non-Disclosure Agreements (NDAs). Your branding files and vector shapes are kept secure on private local servers.'
      }
    ],
    payment: [
      {
        question: 'How does payment work?',
        answer: 'We accept corporate bank transfers (NEFT/RTGS), UPI, and major credit cards. Our terms are 50% advance to start production and the remaining 50% prior to dispatch.'
      },
      {
        question: 'Do you provide a GST invoice?',
        answer: 'Yes. All sales are accompanied by a valid commercial tax invoice listing your company\'s GSTIN so you can claim input tax credit.'
      },
      {
        question: 'What GST rate applies?',
        answer: 'Ortex Industries promotional metal gifts and executive products are subject to 18% GST under the Indian HSN code classifications.'
      },
      {
        question: 'Can I cancel or change an order after confirming?',
        answer: 'No. Because custom runs are laser-etched or milled with your specific logo, we cannot cancel or modify orders once materials are scheduled for setup.'
      }
    ],
    quality: [
      {
        question: 'How do you ensure quality?',
        answer: 'We maintain strict internal QC steps. Every batch is vetted against the signed CAD proof sheet before loading to cargo trucks.'
      },
      {
        question: 'Will a reorder match my previous batch?',
        answer: 'Yes. We archive all engraving files, vector outlines, and CNC parameters so reorders match previous tolerances.'
      },
      {
        question: 'What if an item arrives damaged or defective?',
        answer: 'We cover transit risks. Report any shipping damage with photos to sales@ortexindustries.in within 48 hours of delivery, and we will mill and dispatch replacements free of charge.'
      },
      {
        question: 'How do I reach your team?',
        answer: 'Our corporate helpdesk is open Monday to Saturday (9:00 AM - 6:00 PM). Call/WhatsApp us at +91 9211947188 or email sales@ortexindustries.in.'
      }
    ]
  };

  return (
    <section className="faq-page-container" aria-label="Frequently Asked Questions">
      {/* Header */}
      <div className="section-header" style={{ borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '24px', marginBottom: '40px', textAlign: 'center' }}>
        <span className="section-tag">Manufacturer Helpdesk</span>
        <h2>Frequently Asked Questions</h2>
        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '640px', margin: '12px auto 0 auto', fontSize: '16px', lineHeight: '1.6' }}>
          Everything about ordering, customization, materials, delivery, OEM, and payment, answered in one place.
        </p>
      </div>

      {/* Main Grid */}
      <div className="responsive-faq-grid">
        {/* Left side: Topics navigation */}
        <div>
          <h3 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-text-primary)', letterSpacing: '0.05em', marginBottom: '20px' }}>Browse by Topic</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTopic === topic.id ? 'rgba(13, 20, 26, 0.06)' : 'transparent',
                  color: activeTopic === topic.id ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  fontWeight: activeTopic === topic.id ? '600' : '500',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {topic.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right side: Questions */}
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '24px', borderBottom: '1px solid rgba(13, 20, 26, 0.1)', paddingBottom: '12px', marginTop: 0 }}>
            {topics.find(t => t.id === activeTopic)?.name}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {faqData[activeTopic]?.map((item, idx) => (
              <FAQAccordionItem key={idx} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </div>

      {/* Ribbon Webbing Box */}
      <div className="faq-card" style={{ marginTop: '60px', position: 'relative', overflow: 'hidden', minHeight: '180px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'linear-gradient(90deg, rgba(13, 20, 26, 0.02) 50%, transparent 50%), linear-gradient(rgba(13, 20, 26, 0.02) 50%, transparent 50%)', backgroundSize: '20px 20px', opacity: 0.3 }} />
        
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h4 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px', marginTop: 0 }}>Ortex Lanyard Production Lines</h4>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', maxWidth: '560px', margin: 0, lineHeight: '1.6' }}>
            Custom lanyard and ribbon webbing on an Ortex production line. Calibrated thermal transfer printing ensures vibrant, bleed-free colors on woven polyester fabrics.
          </p>
        </div>
      </div>

      {/* Help CTA Banner - Dark card container */}
      <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'var(--color-text-primary)', borderRadius: '10px', marginTop: '60px', boxShadow: 'var(--shadow-2)' }}>
        <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', marginBottom: '8px', marginTop: 0 }}>Still not sure?</h3>
        <p style={{ fontSize: '15px', color: '#cbd5e1', maxWidth: '520px', margin: '0 auto 24px auto', lineHeight: '1.6' }}>
          Talk to our team directly. Send your requirement and a real person replies within one working day with a formal GST quotation.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigateTo('contact')} className="btn btn-secondary" style={{ padding: '12px 28px', fontSize: '15px', fontWeight: '700', borderRadius: '10px' }}>
            Contact Us
          </button>
          <a
            href={`https://wa.me/919211947188?text=${encodeURIComponent("Hello Ortex Industries,\n\nI have an inquiry regarding corporate promotional gifting runs.")}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#25d366',
              color: '#ffffff',
              padding: '12px 28px',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '700',
              textDecoration: 'none',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#20ba5a'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#25d366'}
          >
            <WhatsAppIcon size={18} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
