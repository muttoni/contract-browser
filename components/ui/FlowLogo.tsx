import React from 'react';

interface Props {
  size: number;
}

const FlowLogo: React.FC<Props> = ({ size }) => {
  return (
    <svg  width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_2_3)">
        <path d="M128 256C198.692 256 256 198.692 256 128C256 57.3076 198.692 0 128 0C57.3076 0 0 57.3076 0 128C0 198.692 57.3076 256 128 256Z" fill="#00EF8B"/>
        <path d="M184.064 108.032H147.968V144.128H184.064V108.032Z" fill="white"/>
        <path d="M111.872 157.696C111.872 165.12 105.728 171.264 98.304 171.264C90.88 171.264 84.736 165.12 84.736 157.696C84.736 150.272 90.88 144.128 98.304 144.128H111.872V108.032H98.304C70.912 108.032 48.64 130.304 48.64 157.696C48.64 185.088 70.912 207.36 98.304 207.36C125.696 207.36 147.968 185.088 147.968 157.696V144.128H111.872V157.696Z" fill="white"/>
        <path d="M161.536 89.856H202.24V53.76H161.536C134.144 53.76 111.872 76.032 111.872 103.424V108.032H147.968V103.424C147.968 96 154.112 89.856 161.536 89.856Z" fill="white"/>
        <path d="M147.968 108.032H111.872V144.128H147.968V108.032Z" fill="#16FF99"/>
        </g>
        <defs>
        <clipPath id="clip0_2_3">
        <rect width="256" height="256" fill="white"/>
        </clipPath>
        </defs>
  </svg>
  );
};

export default FlowLogo;
