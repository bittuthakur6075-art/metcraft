import React from 'react';
import { Factory, FileCheck, Clock, CheckCircle2 } from 'lucide-react';
import './WhyChooseUsSection.css';

export interface WhyChooseUsCard {
  title: string;
  desc: string;
  icon: React.ReactNode;
  variant: 'blue' | 'cyan' | 'mint' | 'green';
}

const WHY_CHOOSE_US_CARDS: WhyChooseUsCard[] = [
  {
    title: 'All in-house',
    desc: 'Design, print, brand, and finish under one roof. One team owns your order end to end.',
    icon: <Factory size={26} />,
    variant: 'blue'
  },
  {
    title: 'Always on-spec',
    desc: 'Fifty pieces or fifty thousand, each matches your approved sample. Quality is built in, never bolted on.',
    icon: <FileCheck size={26} />,
    variant: 'cyan'
  },
  {
    title: 'Always on time',
    desc: 'Launches do not wait, and neither do we. We hit committed dates across our PAN India network.',
    icon: <Clock size={26} />,
    variant: 'mint'
  },
  {
    title: 'A true partner',
    desc: 'Straight talk, honest timelines, and no pricing games. We tell you what is possible, up front.',
    icon: <CheckCircle2 size={26} />,
    variant: 'green'
  }
];

export const WhyChooseUsSection: React.FC = () => {
  return (
    <div className="wcu-section-wrapper" aria-label="Why Choose Ortex Industries">
      <div className="wcu-section-container">
        {/* Header Block */}
        <div className="wcu-header-block">
          <span className="wcu-badge">WHY US</span>
          <h2 className="wcu-main-title">
            Why choose <span className="wcu-accent">Ortex Industries</span>
          </h2>
          <p className="wcu-sub-title">
            Clients keep coming back for how we work, not only for what we make.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="wcu-cards-grid">
          {WHY_CHOOSE_US_CARDS.map((card) => (
            <div className="wcu-card" key={card.title}>
              {/* Pastel Icon Badge */}
              <div className={`wcu-icon-badge wcu-icon-${card.variant}`}>
                {card.icon}
              </div>

              {/* Title & Description */}
              <h3 className="wcu-card-title">{card.title}</h3>
              <p className="wcu-card-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
