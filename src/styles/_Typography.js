import { createGlobalStyle } from "styled-components";

import montserratBold from "../assets/fonts/Montserrat-Bold.woff";
import montserratExtraBold from "../assets/fonts/Montserrat-ExtraBold.woff";
import montserratExtraLight from "../assets/fonts/Montserrat-ExtraLight.woff";
import montserratMedium from "../assets/fonts/Montserrat-Medium.woff";

import merriweatherRegular from "../assets/fonts/Merriweather-Regular.woff";

const Typography = createGlobalStyle`
  
  @font-face {
    font-family: Montserrat-Bold;
    src: url(${montserratBold})
  }

  @font-face {
    font-family: Montserrat-ExtraBold;
    src:
      url(${montserratExtraBold}),
  }

  @font-face {
    font-family: Montserrat-ExtraLight;
    src:
      url(${montserratExtraLight})
  }

  @font-face {
    font-family: Montserrat-Medium;
    src: url(${montserratMedium})
  }

  @font-face {
    font-family: Merriweather-Regular;
    src: url(${merriweatherRegular})
  }
`;

export default Typography;
