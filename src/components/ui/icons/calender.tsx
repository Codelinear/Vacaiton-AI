import React from "react";

const Calendar = ({ className }: { className: string }) => {
  return (
    <svg
      width="25"
      height="28"
      viewBox="0 0 25 28"
      fill="#fff"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.8257 15.5H19.4924V22.1667H12.8257V15.5ZM22.159 3.50001H20.8257V0.833344H18.159V3.50001H7.49235V0.833344H4.82568V3.50001H3.49235C2.02568 3.50001 0.825684 4.70001 0.825684 6.16668V24.8333C0.825684 26.3 2.02568 27.5 3.49235 27.5H22.159C23.6257 27.5 24.8257 26.3 24.8257 24.8333V6.16668C24.8257 4.70001 23.6257 3.50001 22.159 3.50001ZM22.159 6.16668V8.83334H3.49235V6.16668H22.159ZM3.49235 24.8333V11.5H22.159V24.8333H3.49235Z"
        fill="white"
      />
    </svg>
  );
};

export default Calendar;
