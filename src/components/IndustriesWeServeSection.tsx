import React, { useState, useEffect, useRef } from 'react';
import { 
  HeartPulse, 
  Landmark, 
  ShoppingBag, 
  Store, 
  Ship, 
  Hotel, 
  GraduationCap, 
  Building2, 
  ArrowRight, 
  Sparkles,
  FileText
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import './IndustriesWeServeSection.css';

export interface IndustryServeCard {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const INDUSTRIES_SERVE_CARDS: IndustryServeCard[] = [
  {
    title: 'Hospitals & Healthcare',
    desc: 'Medical hardware tags & stainless hygiene components.',
    icon: <HeartPulse size={24} />
  },
  {
    title: 'Government & PSUs',
    desc: 'High-grade Titanium & 304 Stainless compliance serial tags.',
    icon: <Landmark size={24} />
  },
  {
    title: 'Retail & Brands',
    desc: 'Merchandising tags, POS display tokens & branded packaging.',
    icon: <ShoppingBag size={24} />
  },
  {
    title: 'Distributors & Wholesale',
    desc: 'Direct OEM white-label volume supplies & drop-shipping.',
    icon: <Store size={24} />
  },
  {
    title: 'Importers & Exporters',
    desc: 'International export compliant metal hardware with CE/ISO specs.',
    icon: <Ship size={24} />
  },
  {
    title: 'Hotels & Resorts',
    desc: 'Heavy solid brass room key fobs & executive desk amenities.',
    icon: <Hotel size={24} />
  },
  {
    title: 'Schools & Universities',
    desc: 'Custom lapel badges, graduation medals & alumni keychains.',
    icon: <GraduationCap size={24} />
  },
  {
    title: 'Corporate Enterprises',
    desc: 'Executive onboarding kits, metal pens & hardware security holders.',
    icon: <Building2 size={24} />
  }
];

interface IndustriesWeServeSectionProps {
  onRequestQuote?: () => void;
}

export const IndustriesWeServeSection: React.FC<IndustriesWeServeSectionProps> = ({
  onRequestQuote
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollDirRef = useRef<'right' | 'left'>('right');

  // Continuous smooth auto-scrolling loop (Right to Left)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animId: number;
    const speed = 0.75;

    const scrollStep = () => {
      if (!isHovered) {
        const max = track.scrollWidth - track.clientWidth;
        if (max > 0) {
          if (track.scrollLeft >= max - 1) {
            track.scrollLeft = 0;
          } else {
            track.scrollLeft += speed;
          }
        }
      }
      animId = requestAnimationFrame(scrollStep);
    };

    animId = requestAnimationFrame(scrollStep);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isHovered]);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi Ortex Industries! I would like to request a bulk corporate quote and product catalog.");
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <div className="iws-section-wrapper" aria-label="Industries We Serve Section">
      <div className="iws-section-container">
        {/* Header Block */}
        <div className="iws-header-block">
          <span className="iws-badge">WHO WE SUPPLY</span>
          <h2 className="iws-main-title">
            Industries We <span className="iws-serif-italic">Serve</span>
          </h2>
          <p className="iws-sub-title">
            Trusted by bulk buyers across hospitality, institutional, and export supply chains worldwide.
          </p>
        </div>

        {/* Auto-Scrolling Horizontal Track */}
        <div className="iws-track-wrapper">
          <div 
            className="iws-cards-track"
            ref={trackRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
          >
            {INDUSTRIES_SERVE_CARDS.map((card, idx) => (
              <div className="iws-card-item" key={card.title + '-' + idx}>
                <div className="iws-card-icon-badge">
                  {card.icon}
                </div>
                <div className="iws-card-text-group">
                  <h4>{card.title}</h4>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PRE-FOOTER CALL TO ACTION BANNER (Featuring Get Quote & WhatsApp buttons) */}
        <div className="pre-footer-cta-banner">
          <div className="pre-footer-cta-content">
            <span className="pre-footer-cta-tag">
              <Sparkles size={14} /> FAST B2B TURNAROUND
            </span>
            <h3 className="pre-footer-cta-title">
              Ready to Start Your Custom Metal Manufacturing Order?
            </h3>
            <p className="pre-footer-cta-desc">
              Get instant DFM feasibility checks, zero-obligation CAD proofs, and bulk wholesale pricing within 2 hours.
            </p>
          </div>

          <div className="pre-footer-cta-buttons">
            <button 
              className="cta-btn-quote"
              onClick={() => {
                if (onRequestQuote) {
                  onRequestQuote();
                } else {
                  const rfqSection = document.getElementById('b2b-rfq-quote-calculator') || document.getElementById('contact');
                  if (rfqSection) {
                    rfqSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
            >
              <FileText size={16} />
              <span>Get Instant Quote</span>
              <ArrowRight size={16} />
            </button>

            <button 
              className="cta-btn-whatsapp"
              onClick={handleWhatsAppClick}
            >
              <WhatsAppIcon size={18} />
              <span>WhatsApp Inquiry</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
