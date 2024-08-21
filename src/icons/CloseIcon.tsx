import React, { FC } from 'react';

const CloseIcon: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="14"
      viewBox="0 0 13 14"
      fill="none"
    >
      <path
        d="M9.75 3.75L3.25 10.25"
        stroke="#505050"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.25 3.75L9.75 10.25"
        stroke="#505050"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloseIcon;
