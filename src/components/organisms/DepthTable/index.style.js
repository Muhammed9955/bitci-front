import { css } from "react-emotion";

import theme from "theme";

export const LINE_HEIGHT = 23;

export const depthTable = css`
  height: 100%;
`;

export const column = css`
  flex: 1 1;
  padding: 0 5px;

  @media (max-width: ${theme.breakPoints.mobile.max}px) {
    padding: 0 3px;
  }
`;

export const bar = css`
  height: 15px;
  width: 100%;
  position: absolute;
  top: 4px;
  right: 0;
  left: 0;
  opacity: 0.2;
`;

export const line = css`
  cursor: pointer;
  position: relative;
  color: white;
  font-size: 10px;
  font-weight: 600;
  height: ${LINE_HEIGHT}px;
  line-height: ${LINE_HEIGHT}px;
  display: flex;

  .${column}:nth-last-child(2) {
    text-align: right;
  }

  .${column}:nth-child(2):not(:nth-last-child(2)) {
    text-align: center;
  }

  @media (max-width: ${theme.breakPoints.mobile.max}px) {
    font-size: 12px;
  }
`;

export const lineRed = css`
  .${bar} {
    background: ${theme.colors.red};
  }

  .${column}:nth-last-child(2):not(:nth-child(2)) {
    color: ${theme.colors.red};
  }

  @media (max-width: ${theme.breakPoints.mobile.max}px) {
    .${column}:first-child {
      color: ${theme.colors.red};
    }
  }
`;

export const lineGreen = css`
  .${bar} {
    background: ${theme.colors.green};
  }

  .${column}:nth-last-child(2):not(:nth-child(2)) {
    color: ${theme.colors.green};
  }

  @media (max-width: ${theme.breakPoints.mobile.max}px) {
    .${column}:first-child {
      color: ${theme.colors.green};
    }
  }
`;
// export const lineGreen = css`
//   .${bar} {
//     background: ${theme.colors.green};
//   }

//   .${column}:nth-last-child(2):not(:nth-child(2)) {
//     color: ${theme.colors.green};
//   }

//   @media (max-width: ${theme.breakPoints.mobile.max}px) {
//     .${column}:first-child {
//       color: ${theme.colors.green};
//     }
//   }
// `
