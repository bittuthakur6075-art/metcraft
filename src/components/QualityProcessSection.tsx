import React from 'react';
import { Package, Settings, Palette, ShieldCheck, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import './QualityProcessSection.css';

export interface QualityStep {
  number: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const QUALITY_STEPS: QualityStep[] = [
  {
    number: '01',
    title: 'Material selection',
    desc: 'We source graded MDF, acrylic, and hardware so the finish and durability start right at the raw material.',
    icon: <Package size={24} />
  },
  {
    number: '02',
    title: 'Precision production',
    desc: 'Calibrated routing, cutting, and engraving hold tight tolerances so every piece in the run is identical.',
    icon: <Settings size={24} />
  },
  {
    number: '03',
    title: 'Finishing and branding',
    desc: 'UV printing, laser engraving, and embossing are applied and cured to keep your branding crisp and long-lasting.',
    icon: <Palette size={24} />
  },
  {
    number: '04',
    title: 'Final inspection',
    desc: 'Each batch is checked against the approved sample before it is packed, so what leaves our floor is what you signed off.',
    icon: <ShieldCheck size={24} />
  }
];

export const QualityProcessSection: React.FC = () => {
  return (
    <div className="qp-section-wrapper" aria-label="Quality Manufacturing Process">
      <div className="qp-section-container">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="qp-header-block">
            <span className="qp-badge">
              <ShieldCheck size={16} />
              THE QUALITY WE DELIVER
            </span>
            <h2 className="qp-main-title">
              Quality is a <span className="qp-process-italic">process</span>
            </h2>
            <p className="qp-sub-title">
              Every product moves through four deliberate stages before it reaches you, so the standard never comes down to luck.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Process Step Cards */}
        <div className="qp-steps-grid">
          {QUALITY_STEPS.map((step, idx) => (
            <ScrollReveal direction="up" delay={0.12 + idx * 0.1} key={step.number}>
              <div className="qp-step-card">
                {/* Top Row: Icon (Left) & Step Number (Right) */}
                <div className="qp-card-top-row">
                  <div className="qp-icon-badge">
                    {step.icon}
                  </div>
                  <span className="qp-step-number">{step.number}</span>
                </div>

                {/* Title & Description */}
                <h3 className="qp-card-title">{step.title}</h3>
                <p className="qp-card-desc">{step.desc}</p>

                {/* Connecting Desktop Arrow (except last step) */}
                {idx < QUALITY_STEPS.length - 1 && (
                  <ArrowRight className="qp-step-arrow" size={20} />
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};
