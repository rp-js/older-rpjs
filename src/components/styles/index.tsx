import { CSSRules, Directive } from 'twind';
import { css } from 'twind/css';

const BackgroundColor: Directive<CSSRules> = css`
  background-color: #fcdc00;
`;

const HighlightWord: Directive<CSSRules> = css`
  background-color: black;
  color: #fcdc00;
  padding: 0.75rem 1rem;
`;

export default {
  BackgroundColor,
  HighlightWord,
};
