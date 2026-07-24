import React from 'react';
import {
  Factory,
  Layers,
  ShieldCheck,
  TrendingDown,
  Clock,
  Globe,
  ArrowRight,
  FileCheck,
  CheckCircle2
} from 'lucide-react';
import './B2BAdvantageSection.css';

/* ============================================================
   COMPONENT 1: The B2B Manufacturing Advantage (6 feature cards)
   ============================================================ */

interface B2BAdvantageSectionProps {
  onStartProject?: () => void;
}

export const B2BAdvantageSection: React.FC<B2BAdvantageSectionProps> = ({
  onStartProject
}) => {
  return (
    <div className="b2b-adv-section" aria-label="B2B Manufacturing Advantage">
      <div className="b2b-adv-container">
        {/* Header */}
        <div className="b2b-adv-header">
          <span className="b2b-adv-badge">WHAT WE DO</span>
          <h2 className="b2b-adv-title">
            The B2B <span className="b2b-adv-title-script">Manufacturing Advantage</span>
          </h2>
          <p className="b2b-adv-subtitle">
            Comprehensive manufacturing and customization capabilities to serve your business needs
          </p>
        </div>

        {/* 6 Feature Cards */}
        <div className="b2b-adv-grid">
          <div className="b2b-adv-card">
            <div className="b2b-adv-card-icon blue">
              <Factory size={24} />
            </div>
            <h4>OEM & white label manufacturing</h4>
            <p>Complete manufacturing solutions under your brand name with full customization support</p>
          </div>

          <div className="b2b-adv-card">
            <div className="b2b-adv-card-icon teal">
              <Layers size={24} />
            </div>
            <h4>Bulk production capabilities</h4>
            <p>Scalable production facilities to handle orders of any size with consistent quality</p>
          </div>

          <div className="b2b-adv-card">
            <div className="b2b-adv-card-icon cyan">
              <ShieldCheck size={24} />
            </div>
            <h4>Premium quality assurance</h4>
            <p>Rigorous quality control processes ensuring every product meets the highest standards</p>
          </div>

          <div className="b2b-adv-card">
            <div className="b2b-adv-card-icon emerald">
              <TrendingDown size={24} />
            </div>
            <h4>Competitive pricing</h4>
            <p>Direct manufacturing advantages translate to cost-effective solutions for your business</p>
          </div>

          <div className="b2b-adv-card">
            <div className="b2b-adv-card-icon amber">
              <Clock size={24} />
            </div>
            <h4>Fast turnaround times</h4>
            <p>Efficient production workflows and dedicated teams ensure timely delivery of your orders</p>
          </div>

          <div className="b2b-adv-card">
            <div className="b2b-adv-card-icon purple">
              <Globe size={24} />
            </div>
            <h4>Global export support</h4>
            <p>Comprehensive export services with worldwide shipping and documentation support</p>
          </div>
        </div>

        {/* CTA */}
        <div className="b2b-adv-cta-block">
          <p className="b2b-adv-cta-text">Ready to experience the Ortex difference?</p>
          <button
            className="b2b-adv-cta-btn"
            onClick={() => {
              if (onStartProject) {
                onStartProject();
              }
            }}
          >
            <span>Start Your Project</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};


/* ============================================================
   COMPONENT 2: Why Choose Ortex Industries (4 value proposition cards)
   ============================================================ */

export const WhyChooseOrtexSection: React.FC = () => {
  return (
    <div className="wcu-section" aria-label="Why Choose Ortex Industries">
      <div className="wcu-container">
        {/* Header */}
        <div className="wcu-header">
          <span className="wcu-badge">WHY US</span>
          <h2 className="wcu-title">
            Why choose <span className="wcu-title-accent">Ortex Industries</span>
          </h2>
          <p className="wcu-subtitle">
            Clients keep coming back for how we work, not only for what we make.
          </p>
        </div>

        {/* 4 Cards */}
        <div className="wcu-grid">
          <div className="wcu-card">
            <div className="wcu-card-icon wcu-blue">
              <Factory size={26} />
            </div>
            <h4>All in-house</h4>
            <p>Design, print, brand, and finish under one roof. One team owns your order end to end.</p>
          </div>

          <div className="wcu-card">
            <div className="wcu-card-icon wcu-cyan">
              <FileCheck size={26} />
            </div>
            <h4>Always on-spec</h4>
            <p>Fifty pieces or fifty thousand, each matches your approved sample. Quality is built in, never bolted on.</p>
          </div>

          <div className="wcu-card">
            <div className="wcu-card-icon wcu-mint">
              <Clock size={26} />
            </div>
            <h4>Always on time</h4>
            <p>Launches do not wait, and neither do we. We hit committed dates across our PAN India network.</p>
          </div>

          <div className="wcu-card">
            <div className="wcu-card-icon wcu-green">
              <CheckCircle2 size={26} />
            </div>
            <h4>A true partner</h4>
            <p>Straight talk, honest timelines, and no pricing games. We tell you what is possible, up front.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
