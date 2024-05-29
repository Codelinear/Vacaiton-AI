import React from "react";

const BgVector = ({ className }: { className: string }) => {
  return (
    <svg
      width="1920"
      height="912"
      viewBox="0 0 1920 912"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="url(#filter0_f_14_24)">
        <path
          d="M1911.37 496.391C2041.79 409.041 2132.21 459.517 2161.11 495.673C2222.81 535.84 2101.43 675.812 2060.26 687.192C2019.09 698.572 1920.91 736.124 1865.18 772.894C1809.46 809.665 1766.91 1028.58 1706.94 1142.45C1646.97 1256.33 1467.81 1376.86 1354.87 1396.72C1241.93 1416.59 1034.41 1211.44 884.64 1086.3C734.872 961.15 372.191 965.207 234.937 896.236C97.6826 827.265 -68.3209 696.875 -81.5232 640.336C-94.7256 583.798 -45.5519 609.692 89.0555 554.956C223.663 500.22 464.479 683.229 596.885 733.118C729.29 783.006 971.483 900.625 1180.23 934.518C1388.99 968.412 1488.49 829.077 1620.39 716.715C1752.28 604.353 1748.33 605.578 1911.37 496.391Z"
          fill="url(#paint0_diamond_14_24)"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_14_24"
          x="-530.846"
          y="0.716309"
          width="3156.37"
          height="1844.6"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="223.627"
            result="effect1_foregroundBlur_14_24"
          />
        </filter>
        <radialGradient
          id="paint0_diamond_14_24"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(946.054 1233.04) rotate(-152.153) scale(1328.71 2075.23)"
        >
          <stop stop-color="#C7EEFF" />
          <stop offset="0.207516" stop-color="#82C3FF" />
          <stop offset="0.555417" stop-color="#1D46AE" />
          <stop offset="0.883901" stop-color="#121676" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default BgVector;
