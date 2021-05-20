import React from "react";

const BTG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <defs>
        <pattern
          id="pattern"
          preserveAspectRatio="xMidYMid slice"
          width="100%"
          height="100%"
          viewBox="0 0 128 128"
        >
          <image
            width="128"
            height="128"
            xlink:href="data:image/png;base64,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"
          />
        </pattern>
      </defs>
      <circle id="icon" cx="12" cy="12" r="12" fill="url(#pattern)" />
    </svg>
  );
};

export default BTG;