import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  /* 아래에 추가적으로 적용할 전역 스타일 작성 */
  @font-face {
    font-family: 'Pretendard';
    font-weight: 300;
    src: url('./assets/PretendardVariable.ttf') format('ttf');
  }
`;
