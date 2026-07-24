import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  ShoppingBag, 
  Rocket, 
  Hotel, 
  Cpu, 
  Building, 
  Gift, 
  GraduationCap, 
  Shield, 
  Car, 
  Laptop, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  FileText, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import './IndustrySolutionsSection.css';

export interface SectorItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  specs: {
    title: string;
    desc: string;
    icon: React.ReactNode;
  }[];
}

const SECTOR_DATA: SectorItem[] = [
  {
    id: 'all',
    name: 'All Sectors',
    icon: <Layers className="ind-tab-icon" />,
    title: 'Custom Metal Fabrication Across All Industries',
    desc: 'We engineer precision metal components, desk accessories, and corporate gifts with ISO 9001:2015 tolerances, instant DFM feasibility checks, and 100% GST compliant invoicing across all business verticals.',
    specs: [
      { title: 'ISO 9001:2015 Certified', desc: 'Precision CNC machining & stamping tolerances', icon: <ShieldCheck size={18} /> },
      { title: 'Custom Alloy Selection', desc: 'Titanium Grade 5, C360 Brass & Stainless Steel', icon: <Cpu size={18} /> },
      { title: 'Instant DFM Feedback', desc: '2-hour digital CAD proof & placement alignment', icon: <Sparkles size={18} /> },
      { title: 'GST B2B Invoicing', desc: '100% tax credit compliance & pan-India cargo', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'retail',
    name: 'Retail & Brands',
    icon: <ShoppingBag className="ind-tab-icon" />,
    title: 'Custom Merchandising Tags & Retail Metal Hardware',
    desc: 'Elevate your retail merchandise with custom engraved logo keychains, brass hangtags, point-of-sale display tokens, and premium retail packaging hardware that drive brand loyalty.',
    specs: [
      { title: 'Custom Hangtags', desc: 'High-polish mirror brass & matte black steel', icon: <ShoppingBag size={18} /> },
      { title: 'POS Loyalty Tokens', desc: 'Custom stamped coins & membership keyrings', icon: <CheckCircle2 size={18} /> },
      { title: 'Retail Packaging', desc: 'Custom embossed tin & velvet presentation boxes', icon: <Gift size={18} /> },
      { title: 'Low MOQ Runs', desc: 'Flexible initial trial production from 50 units', icon: <Layers size={18} /> }
    ]
  },
  {
    id: 'startups',
    name: 'Startups & SMEs',
    icon: <Rocket className="ind-tab-icon" />,
    title: 'Fast Turnaround Prototyping & Launch Day Merch',
    desc: 'Empowering high-growth startups and small enterprises with rapid 48-hour prototyping, branded swag keychains, team onboarding kits, and low-minimum custom metal products.',
    specs: [
      { title: '48-Hour Rapid CAD', desc: '3D rendering & physical prototype dispatch', icon: <Rocket size={18} /> },
      { title: 'Team Launch Kits', desc: 'Custom engraved keys & EDC minimalist tools', icon: <Gift size={18} /> },
      { title: 'Flexible Quantities', desc: 'Scale seamlessly from 50 to 50,000+ units', icon: <Layers size={18} /> },
      { title: 'Budget Friendly', desc: 'Direct OEM factory pricing with zero agent markups', icon: <ShieldCheck size={18} /> }
    ]
  },
  {
    id: 'hotels',
    name: 'Hotels & Hospitality',
    icon: <Hotel className="ind-tab-icon" />,
    title: 'Luxury Hotel Room Key Tags & Executive Amenities',
    desc: 'Crafting heavy-weight luxury room key fobs, luggage identification tags, brass desk bell accents, and VIP guest welcome tokens for boutique hotels and luxury resorts.',
    specs: [
      { title: 'Heavy Brass Fobs', desc: 'Solid C360 architectural brass with deep engraving', icon: <Hotel size={18} /> },
      { title: 'Wear-Resistant Finish', desc: 'PVD gold & antique bronze protective coating', icon: <ShieldCheck size={18} /> },
      { title: 'Room Numbering', desc: 'Sequential laser number & QR code integration', icon: <FileText size={18} /> },
      { title: 'VIP Amenities', desc: 'Custom metal coasters & executive desk gifts', icon: <Sparkles size={18} /> }
    ]
  },
  {
    id: 'oem',
    name: 'Resellers & OEM',
    icon: <Cpu className="ind-tab-icon" />,
    title: 'Private Label OEM Metal Manufacturing & Drop-Shipping',
    desc: 'Contract manufacturing partner for corporate gift suppliers and OEM resellers. Complete white-label production, unbranded packaging, and strict NDA confidentiality guarantees.',
    specs: [
      { title: '100% White Label', desc: 'Unbranded shipping directly to end clients', icon: <Cpu size={18} /> },
      { title: 'Strict NDA Guarantee', desc: 'Complete client confidentiality & design protection', icon: <Shield size={18} /> },
      { title: 'Volume Tier Discounts', desc: 'Maximum margin potential for wholesale partners', icon: <Layers size={18} /> },
      { title: 'Custom Packaging', desc: 'Print custom logo boxes with your client branding', icon: <Gift size={18} /> }
    ]
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    icon: <Building className="ind-tab-icon" />,
    title: 'Property Handover Keychains & Executive Builder Gifts',
    desc: 'Make home handovers unforgettable. Premium leather and metal keychains engraved with villa/apartment numbers, builder logos, and luxury gift presentation boxes for homebuyers.',
    specs: [
      { title: 'Handover Keychains', desc: 'Genuine leather & electroplated metal keyrings', icon: <Building size={18} /> },
      { title: 'Property Numbering', desc: 'Sequential tower, flat & block number engraving', icon: <FileText size={18} /> },
      { title: 'Gift Presentation', desc: 'Luxurious magnetic closing boxes for keys', icon: <Gift size={18} /> },
      { title: 'High-Volume Capacity', desc: 'Fulfill multi-tower residential project handovers', icon: <Layers size={18} /> }
    ]
  },
  {
    id: 'gifting',
    name: 'Corporate Gifting',
    icon: <Gift className="ind-tab-icon" />,
    title: 'Executive Desk Accessories & Premium Award Keepsakes',
    desc: 'Curated corporate gifting solutions including precision metal pens, stainless steel coaster sets, executive card holders, and laser-etched metal award trophies for festive gifting.',
    specs: [
      { title: 'Executive Pens', desc: 'Weighted brass & aviation aluminum rollerballs', icon: <Gift size={18} /> },
      { title: 'Desk Organizers', desc: 'CNC machined anodized aluminum organizer trays', icon: <Sparkles size={18} /> },
      { title: 'Festive Gift Sets', desc: 'Custom multi-item gift sets with custom sleeves', icon: <CheckCircle2 size={18} /> },
      { title: 'Individual Laser Names', desc: 'Personalize each recipient name on every product', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'schools',
    name: 'Schools & Colleges',
    icon: <GraduationCap className="ind-tab-icon" />,
    title: 'Custom Lapel Pins, Medals & Alumni Keychains',
    desc: 'Designing custom university crest badges, academic achievement medals, alumni association keychains, and graduation commemorative gifts for educational institutions.',
    specs: [
      { title: 'Enamel Crest Pins', desc: 'Soft & hard enamel lapel pins with clutch backs', icon: <GraduationCap size={18} /> },
      { title: 'Graduation Medals', desc: '3D die-cast medals with ribbon loops', icon: <Sparkles size={18} /> },
      { title: 'Alumni Keepsakes', desc: 'Custom engraved keychains for annual reunions', icon: <Gift size={18} /> },
      { title: 'Institutional Billing', desc: 'Purchase order support & GST invoice processing', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'defense',
    name: 'Government & Defense',
    icon: <Shield className="ind-tab-icon" />,
    title: 'High-Grade Compliance Tags & Military Insignia Badges',
    desc: 'Manufacturing high-durability Grade 5 Titanium and 304 Stainless Steel identification tags, serial plates, and defense unit insignia tokens built for extreme environment resilience.',
    specs: [
      { title: 'Aerospace Grade Alloys', desc: 'Corrosion proof Titanium & 316 Stainless Steel', icon: <Shield size={18} /> },
      { title: 'Laser Serial Numbering', desc: 'Deep fiber laser engraving for permanent identification', icon: <FileText size={18} /> },
      { title: 'Extreme Environment', desc: 'Salt spray & chemical resistance tested components', icon: <ShieldCheck size={18} /> },
      { title: 'Government Compliance', desc: 'Full metallurgical mill test reports included', icon: <CheckCircle2 size={18} /> }
    ]
  },
  {
    id: 'automotive',
    name: 'Automotive & Aviation',
    icon: <Car className="ind-tab-icon" />,
    title: 'Automotive Keychains, VIN Plates & Aviation Tags',
    desc: 'Precision crafted automotive dealership keychains, aircraft remove-before-flight metal tags, custom car club emblem keyrings, and serialized vehicle identification tags.',
    specs: [
      { title: 'Dealership Keyrings', desc: 'Durable zinc alloy & leather keychains for auto sales', icon: <Car size={18} /> },
      { title: 'Aviation Alloy Tags', desc: 'Ultra-light aircraft grade anodized aluminum', icon: <Rocket size={18} /> },
      { title: 'VIN & Serial Plates', desc: 'Precision stamped stainless steel chassis plates', icon: <FileText size={18} /> },
      { title: 'Custom Emblems', desc: 'High definition 3D domed & die-struck logos', icon: <Sparkles size={18} /> }
    ]
  },
  {
    id: 'tech',
    name: 'IT & Enterprises',
    icon: <Laptop className="ind-tab-icon" />,
    title: 'Employee Onboarding Merch & IT Security Token Fobs',
    desc: 'Equipping global tech enterprises with custom metal hardware security key holders, employee onboarding gift boxes, webcam privacy covers, and sleek aluminum desk accessories.',
    specs: [
      { title: 'Security Token Keychains', desc: 'YubiKey & access card heavy-duty metal holders', icon: <Laptop size={18} /> },
      { title: 'Onboarding Gift Boxes', desc: 'Welcome swag kits with custom laser branding', icon: <Gift size={18} /> },
      { title: 'Minimalist Desk Items', desc: 'Anodized phone stands & metallic cable anchors', icon: <Sparkles size={18} /> },
      { title: 'Global Multi-Office Cargo', desc: 'Split shipment dispatch to nationwide office hubs', icon: <Layers size={18} /> }
    ]
  }
];

interface IndustrySolutionsSectionProps {
  onNavigateToCatalog?: () => void;
  onRequestQuote?: () => void;
}

export const IndustrySolutionsSection: React.FC<IndustrySolutionsSectionProps> = ({
  onNavigateToCatalog,
  onRequestQuote
}) => {
  const [activeSectorId, setActiveSectorId] = useState('all');
  const [isHovered, setIsHovered] = useState(false);
  const tabsTrackRef = useRef<HTMLDivElement>(null);
  const scrollDirectionRef = useRef<'right' | 'left'>('right');

  const activeSector = SECTOR_DATA.find(s => s.id === activeSectorId) || SECTOR_DATA[0];

  // Ping-Pong smooth auto-scrolling loop (Scrolls Right to end, then Left back to start)
  useEffect(() => {
    const track = tabsTrackRef.current;
    if (!track) return;

    let animationFrameId: number;
    const scrollSpeed = 0.75; // smooth speed

    const autoScroll = () => {
      if (!isHovered) {
        const maxScroll = track.scrollWidth - track.clientWidth;
        
        if (maxScroll > 0) {
          if (scrollDirectionRef.current === 'right') {
            track.scrollLeft += scrollSpeed;
            if (track.scrollLeft >= maxScroll - 1) {
              scrollDirectionRef.current = 'left';
            }
          } else {
            track.scrollLeft -= scrollSpeed;
            if (track.scrollLeft <= 1) {
              scrollDirectionRef.current = 'right';
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  // Center active tab smoothly when selected
  const handleSelectSector = (id: string) => {
    setActiveSectorId(id);
    const track = tabsTrackRef.current;
    if (track) {
      const activeElement = track.querySelector(`[data-sector-id="${id}"]`) as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  return (
    <div className="ind-section-container" id="vertical-solutions">
      {/* Header Block */}
      <div className="ind-header-block">
        <span className="ind-badge">
          <Sparkles size={14} />
          VERTICAL SOLUTIONS
        </span>
        <h2 className="ind-main-title">
          Built for Every Industry, <span className="ind-accent">Designed to Scale.</span>
        </h2>
        <p className="ind-sub-title">
          Every sector buys differently. We engineer precision metal components and customized products to the exact specs, tolerances, and compliance standards your industry requires.
        </p>
      </div>

      {/* Sector Dropdown Selector Bar */}
      <div className="ind-controls-bar">
        <div className="ind-dropdown-wrap">
          <span className="ind-dropdown-label">Select Industry Sector:</span>
          <div className="ind-select-box-container">
            <select
              className="ind-select-box"
              value={activeSectorId}
              onChange={(e) => handleSelectSector(e.target.value)}
              aria-label="Select Industry Sector"
            >
              {SECTOR_DATA.map((sec) => (
                <option key={sec.id} value={sec.id}>
                  {sec.name}
                </option>
              ))}
            </select>
            <ChevronDown className="ind-select-arrow" size={16} />
          </div>
        </div>

        {/* Auto-Scroll Status Indicator */}
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span>Auto-scrolling ⇄ Hover to pause</span>
        </span>
      </div>

      {/* Horizontal Continuous Auto-Scrollable Tabs (Ping-Pong Right & Left) */}
      <div className="ind-tabs-wrapper">
        <div 
          className="ind-tabs-track"
          ref={tabsTrackRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          {SECTOR_DATA.map((sector) => (
            <button
              key={sector.id}
              data-sector-id={sector.id}
              className={`ind-tab-btn ${activeSectorId === sector.id ? 'active' : ''}`}
              onClick={() => handleSelectSector(sector.id)}
            >
              {sector.icon}
              <span>{sector.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Capability Showcase Card */}
      <div className="ind-card-showcase">
        <div className="ind-bg-glow" />
        
        <span className="ind-card-subtag">Industry Capabilities</span>
        <h3 className="ind-card-title">{activeSector.title}</h3>
        <p className="ind-card-desc">{activeSector.desc}</p>

        {/* Specs Grid */}
        <div className="ind-spec-grid">
          {activeSector.specs.map((spec, idx) => (
            <div className="ind-spec-item" key={idx}>
              <div className="ind-spec-icon-box">
                {spec.icon}
              </div>
              <div className="ind-spec-text">
                <h5>{spec.title}</h5>
                <p>{spec.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="ind-cta-row">
          <button 
            className="ind-btn-primary"
            onClick={() => {
              if (onRequestQuote) {
                onRequestQuote();
              } else {
                const quoteSection = document.getElementById('b2b-rfq-quote-calculator') || document.getElementById('contact');
                if (quoteSection) {
                  quoteSection.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
          >
            <span>Request Sector Quote</span>
            <ArrowRight size={16} />
          </button>

          <button 
            className="ind-btn-secondary"
            onClick={() => {
              if (onNavigateToCatalog) {
                onNavigateToCatalog();
              } else {
                const catalogEl = document.getElementById('catalog');
                if (catalogEl) {
                  catalogEl.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
          >
            <span>Explore Sector Catalog</span>
          </button>
        </div>
      </div>
    </div>
  );
};
