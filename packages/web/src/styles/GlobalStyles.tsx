import React from 'react';
import { createGlobalStyle } from 'styled-components';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';

const CustomStyles = createGlobalStyle`
  body {
    ${tw`antialiased`}
  }
   .enter {
    ${tw`transform transition ease-in-out duration-500 sm:duration-700`}
  }
  .enterFrom {
    ${tw`translate-x-full`}
  }
  .enterTo {
    ${tw`translate-x-0`}
  }
  .leave {
    ${tw`transform transition ease-in-out duration-500 sm:duration-700`}
  }
  .leaveFrom {
    ${tw`translate-x-0`}
  }
  .leaveTo {
    ${tw`translate-x-full`}
  }
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
