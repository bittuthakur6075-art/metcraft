import { CheckCircle2, Sparkles, Briefcase, Star } from 'lucide-react';

interface AboutPageProps {
  navigateTo: (page: string) => void;
}

export function AboutPage({ navigateTo }: AboutPageProps) {
  return (
    <section className="about-page-container" aria-label="About Ortex Industries">
      {/* Header Section */}
      <div className="section-header" style={{ borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '24px', marginBottom: '40px', textAlign: 'center' }}>
        <span className="section-tag">Manufacturer Direct Desk</span>
        <h2>About Ortex Industries</h2>
        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '640px', margin: '12px auto 0 auto', fontSize: '16px', lineHeight: '1.6' }}>
          Your trusted manufacturing partner for premium customized products, serving brands across India and worldwide.
        </p>
      </div>

      {/* Who We Are Grid */}
      <div className="responsive-about-grid">
        <div>
          <h3>Who We Are</h3>
          <h4 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '16px', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            Our story is built on range with reliability.
          </h4>
          <p>
            Ortex Industries started with one frustration we heard again and again: getting custom products made usually meant choosing between quality and turnaround. We built the company to remove that trade-off, and to give businesses a manufacturing partner they could actually rely on, order after order.
          </p>
          <p>
            Everything runs under our own roof, from CNC routing and UV printing to laser engraving, assembly, and packing. That in-house control is how we keep quality consistent from the first sample to a bulk run, and it is why corporates, schools, agencies, and resellers keep coming back to us.
          </p>
          <p>
            What sets us apart is range with reliability. MDF and acrylic items, lanyards, badges, corporate gifts, and more, all produced to your artwork, at your volume, and delivered across India and exported worldwide. Behind every order is a simple commitment: clear communication, honest timelines, and finished products we would put our own name on.
          </p>
        </div>

        {/* Laser Engraving Mockup Box */}
        <div className="about-card" style={{ position: 'relative', overflow: 'hidden', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Grid pattern background */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'radial-gradient(rgba(13, 20, 26, 0.06) 1px, transparent 0)', backgroundSize: '16px 16px', opacity: 0.5 }} />
          
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(37,211,102,0.08)', color: '#25d366', marginBottom: '16px' }}>
              <Sparkles size={32} />
            </div>
            <h4 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Ortex CNC Engraving Floor</h4>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.6' }}>
              Close-up of laser engraving in progress on the Ortex Industries production floor. Calibrated precision milling.
            </p>
            
            {/* laser beam line marker */}
            <div style={{ height: '2px', width: '80%', backgroundColor: '#ef4444', margin: '20px auto 0 auto', boxShadow: '0 0 12px #ef4444', borderRadius: '2px' }} />
          </div>
        </div>
      </div>

      {/* Statistics Tickers */}
      <div className="responsive-stats-grid">
        <div className="about-card">
          <div style={{ fontSize: '40px', fontWeight: '800', color: 'var(--color-text-primary)', lineHeight: 1.2 }}>10+</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '6px', fontWeight: '600' }}>Years Crafting Custom Products</div>
        </div>
        <div className="about-card">
          <div style={{ fontSize: '40px', fontWeight: '800', color: 'var(--color-text-primary)', lineHeight: 1.2 }}>5L+</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '6px', fontWeight: '600' }}>Products Delivered to Date</div>
        </div>
        <div className="about-card">
          <div style={{ fontSize: '40px', fontWeight: '800', color: 'var(--color-text-primary)', lineHeight: 1.2 }}>1,200+</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '6px', fontWeight: '600' }}>Brands & Businesses Served</div>
        </div>
        <div className="about-card">
          <div style={{ fontSize: '40px', fontWeight: '800', color: 'var(--color-text-primary)', lineHeight: 1.2 }}>98%</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '6px', fontWeight: '600' }}>Orders Dispatched On Time</div>
        </div>
      </div>

      {/* How We Started Timeline */}
      <div style={{ marginBottom: '60px' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '8px' }}>How We Started</h3>
        <p style={{ textAlign: 'center', marginBottom: '40px', color: 'var(--color-text-secondary)' }}>
          We never grew by doing more, only by doing it right, every single time.
        </p>

        <div className="responsive-timeline-grid">
          {[
            {
              step: '01',
              title: 'The Beginning',
              subtitle: 'It started with a promise',
              desc: 'Ortex began as one small workshop with a single belief: every business deserves a maker who treats their order like their own brand is on the line.'
            },
            {
              step: '02',
              title: 'Building the Floor',
              subtitle: 'We built our own floor',
              desc: 'So we stopped outsourcing and invested in our own routing, UV printing, laser engraving, and finishing, keeping quality and timelines in our hands.'
            },
            {
              step: '03',
              title: 'Earning Trust',
              subtitle: 'Trust, earned order by order',
              desc: 'Word travelled through corporates, schools, and event teams. Clients who came for one run kept coming back because what shipped matched exactly.'
            },
            {
              step: '04',
              title: 'Today',
              subtitle: 'A partner, not a vendor',
              desc: 'Today we supply brands across India and export worldwide, making MDF, acrylic, lanyards, badges, and gifts at scale, all under one roof.'
            }
          ].map((item, idx) => (
            <div key={idx} className="timeline-card">
              <div className="timeline-number">{item.step}</div>
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '4px' }}>{item.title}</h4>
              <h5 style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-text-secondary)', fontStyle: 'italic', marginBottom: '12px' }}>{item.subtitle}</h5>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.5' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Expertise Section */}
      <div style={{ marginBottom: '60px' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '8px' }}>Our Expertise</h3>
        <p style={{ textAlign: 'center', marginBottom: '40px', color: 'var(--color-text-secondary)' }}>
          Comprehensive manufacturing and customization capabilities to serve your business needs.
        </p>

        <div className="responsive-expertise-grid">
          {[
            { title: 'OEM & White Label', desc: 'Complete manufacturing solutions under your brand name with full design configurations.' },
            { title: 'Bulk Production Capabilities', desc: 'Scalable production facilities to handle orders of any size with consistent tolerances.' },
            { title: 'Premium Quality Assurance', desc: 'Rigorous batch checks against sign-off sheets ensuring every piece is identical.' },
            { title: 'Competitive Factory Rates', desc: 'Direct manufacturer benefits translate to cost-effective wholesale pricing runs.' },
            { title: 'Fast Turnaround Times', desc: 'Dedicated production scheduling coordinates and expedites cargo loadouts.' },
            { title: 'Global Export Support', desc: 'Complete export custom clearing logistics support with worldwide shipping.' }
          ].map((item, idx) => (
            <div key={idx} className="about-card">
              <div style={{ display: 'inline-flex', padding: '8px', borderRadius: '6px', backgroundColor: 'rgba(13, 20, 26, 0.04)', color: 'var(--color-text-primary)', marginBottom: '12px' }}>
                <Briefcase size={18} />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>{item.title}</h4>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.5' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Process */}
      <div style={{ marginBottom: '60px' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '8px' }}>Quality is a Process</h3>
        <p style={{ textAlign: 'center', marginBottom: '40px', color: 'var(--color-text-secondary)' }}>
          Every product moves through four deliberate stages before cargo dispatch.
        </p>

        <div className="responsive-quality-grid">
          {[
            { num: '01', title: 'Material Selection', desc: 'We source graded MDF, raw acrylic plates, and metal hardware right at the raw material loading dock.' },
            { num: '02', title: 'Precision Production', desc: 'Calibrated CNC cutting, routing, and precision laser adjustments keep product measurements uniform.' },
            { num: '03', title: 'Finishing & Branding', desc: 'High-adhesion UV print, permanent laser engraving, and custom metal embossing are cured to endure.' },
            { num: '04', title: 'Final Inspection', desc: 'Each production run batch is vetted against signed proof sheets by our QA engineers before packing.' }
          ].map((item, idx) => (
            <div key={idx} className="quality-card">
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-secondary)', marginBottom: '6px', letterSpacing: '0.05em' }}>STAGE {item.num}</div>
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>{item.title}</h4>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.5' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="about-card" style={{ marginBottom: '60px' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '32px', marginTop: 0 }}>Why Choose Ortex Industries</h3>
        
        <div className="responsive-why-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <CheckCircle2 size={20} style={{ color: '#25d366', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-text-primary)', margin: '0 0 4px 0' }}>All In-House Control</h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.5' }}>Design, printing, etching, and packing occur on our floor. One team owns your order end to end.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <CheckCircle2 size={20} style={{ color: '#25d366', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-text-primary)', margin: '0 0 4px 0' }}>Always On-Spec Tolerances</h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.5' }}>Whether custom order is 50 pieces or 50,000, each run strictly conforms to your signed prototype sheet.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <CheckCircle2 size={20} style={{ color: '#25d366', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-text-primary)', margin: '0 0 4px 0' }}>Always On-Time Dispatch</h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.5' }}>Launches and corporate events do not wait. We hit committed transit timelines across PAN India.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <CheckCircle2 size={20} style={{ color: '#25d366', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-text-primary)', margin: '0 0 4px 0' }}>True Corporate Partner</h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.5' }}>Honest timelines, clear pricing matrix, no middlemen. We confirm details and capacities up front.</p>
              </div>
            </div>
          </div>

          <div className="about-card" style={{ backgroundColor: 'rgba(13, 20, 26, 0.01)', border: '1px solid rgba(13, 20, 26, 0.08)' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '16px' }}>Direct Capabilities Check</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Star size={12} style={{ color: 'var(--color-surface-raised)', flexShrink: 0 }} /> In-house facilities with advanced CNC routing</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Star size={12} style={{ color: 'var(--color-surface-raised)', flexShrink: 0 }} /> Unlimited customization across every category</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Star size={12} style={{ color: 'var(--color-surface-raised)', flexShrink: 0 }} /> Dedicated design and production teams</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Star size={12} style={{ color: 'var(--color-surface-raised)', flexShrink: 0 }} /> Factory-direct pricing without distributor markups</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Star size={12} style={{ color: 'var(--color-surface-raised)', flexShrink: 0 }} /> PAN India delivery with trusted logistics partners</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Star size={12} style={{ color: 'var(--color-surface-raised)', flexShrink: 0 }} /> Export ready with global documentation support</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Star size={12} style={{ color: 'var(--color-surface-raised)', flexShrink: 0 }} /> Fast prototyping turnarounds for urgent events</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Star size={12} style={{ color: 'var(--color-surface-raised)', flexShrink: 0 }} /> Full branding suite: UV print, laser, and emboss</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action Banner - Styled as a Premium Dark Card in a Light Website */}
      <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'var(--color-text-primary)', borderRadius: '10px', boxShadow: 'var(--shadow-2)' }}>
        <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', marginBottom: '8px', marginTop: 0 }}>Skip the middleman. Come to the maker.</h3>
        <p style={{ fontSize: '15px', color: '#cbd5e1', maxWidth: '560px', margin: '0 auto 24px auto', lineHeight: '1.6' }}>
          Design, production, and branding under one roof. On-spec, on time, from first proof to final cargo dispatch.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigateTo('contact')} className="btn btn-secondary" style={{ padding: '12px 28px', fontSize: '15px', fontWeight: '700', borderRadius: '10px' }}>
            Get a Quote
          </button>
          <button onClick={() => navigateTo('catalog')} className="btn btn-ghost-light" style={{ padding: '12px 28px', fontSize: '15px', fontWeight: '700', borderRadius: '10px', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)' }}>
            Explore Catalog
          </button>
        </div>
      </div>
    </section>
  );
}
