import React from 'react';

interface WhatsAppIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  useImage?: boolean;
}

export const WhatsAppIcon: React.FC<WhatsAppIconProps> = ({
  size = 28,
  className = '',
  style,
  useImage = false
}) => {
  if (useImage) {
    return (
      <img
        src="/whatsapp-icon.png"
        alt="WhatsApp"
        width={size}
        height={size}
        className={className}
        style={{
          display: 'inline-block',
          verticalAlign: 'middle',
          flexShrink: 0,
          objectFit: 'contain',
          ...style
        }}
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 175.216 175.552"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* White Outer Speech Bubble Frame & Border (Matching User Screenshot) */}
      <path
        fill="#FFFFFF"
        d="M.289 175.552l12.443-45.474C4.846 116.143.784 100.28.784 83.742.784 37.567 38.351 0 84.526 0c46.174 0 83.741 37.567 83.741 83.742 0 46.175-37.567 83.742-83.741 83.742-15.688 0-30.82-4.407-43.917-12.498L.289 175.552z"
      />
      {/* Inner Green Speech Bubble Body */}
      <path
        fill="#25D366"
        d="M12.981 162.779l3.52 1.026c11.597 3.382 23.754 5.169 35.969 5.169 66.527 0 120.672-54.145 120.672-120.672S119.001 0 52.474 0C-14.053 0-68.198 54.145-68.198 120.672c0 22.046 5.86 43.51 16.953 62.433l1.226 2.091-7.142 26.082 26.657-6.993z"
        transform="translate(32.052 8.328) scale(0.605)"
      />
      {/* Inner White Phone Handset Icon */}
      <path
        fill="#FFFFFF"
        d="M136.924 108.657c-2.438-.975-14.303-7.051-16.516-7.863-2.213-.812-3.824-1.219-5.436 1.219-1.612 2.438-6.25 7.863-7.662 9.475-1.412 1.612-2.825 1.812-5.263.837-2.438-.975-10.288-3.791-19.601-12.094-7.25-6.463-12.148-14.444-13.56-16.882-1.412-2.438-.15-3.756.975-4.881 1.012-1.012 2.438-2.825 3.65-4.237 1.213-1.412 1.613-2.438 2.425-4.05.813-1.612.406-3.037-.203-4.256-.609-1.219-5.436-13.094-7.447-17.925-1.957-4.706-3.95-4.062-5.436-4.137-1.413-.075-3.037-.075-4.662-.075-1.625 0-4.262.609-6.475 3.037-2.213 2.438-8.45 8.262-8.45 20.144 0 11.881 8.653 23.363 9.865 24.975 1.213 1.613 17.035 25.994 41.266 36.469 5.762 2.494 10.262 3.988 13.775 5.106 5.787 1.838 11.056 1.581 15.213.962 4.637-.688 14.303-5.844 16.325-11.494 2.022-5.65 2.022-10.494 1.413-11.494-.609-1-2.222-1.612-4.66-2.587z"
      />
    </svg>
  );
};

