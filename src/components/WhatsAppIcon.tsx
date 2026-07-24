import React from 'react';

interface WhatsAppIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  bubbleColor?: string;
  phoneColor?: string;
}

export const WhatsAppIcon: React.FC<WhatsAppIconProps> = ({
  size = 24,
  className = '',
  style,
  bubbleColor = '#25D366',
  phoneColor = '#FFFFFF'
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer Green Bubble */}
      <path
        fill={bubbleColor}
        d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.118 1.54 5.86L.18 23.475l5.77-1.503C7.653 23.284 9.76 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"
      />
      {/* Inner White Phone Icon */}
      <path
        fill={phoneColor}
        d="M18.52 14.28c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z"
      />
    </svg>
  );
};
