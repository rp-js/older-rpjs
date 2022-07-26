import { tw } from 'twind';
import { css } from 'twind/css';
import { IButton, ILinkButton, ILinkedinButton, ISocialMediaButton } from './button.model';

const baseStyle = `font-sans font-medium py-2 px-4 rounded cursor-pointer shadow-md`;

const primaryButtonStyle = css`
  font-weight: bold;
  background-color: #fcdc00;
  color: black;
  border: 1px solid black;
`;

const PrimaryButton = ({ twModifiers, children, disabled, ...rest }: IButton) => (
  <button
    type="button"
    className={tw(`${baseStyle} ${twModifiers ?? ``}`, primaryButtonStyle)}
    {...rest}
    disabled={disabled}
  >
    {children}
  </button>
);

const SecondaryButton = ({ twModifiers, children, disabled, ...rest }: IButton) => {
  const secondaryButtonStyle = css`
    font-weight: bold;
    background-color: #ec008c;
    color: white;
    border: #ec008c;

    &:hover {
      background: linear-gradient(145deg, #f05a28 0, #ec008c 100%);
    }
  `;

  return (
    <button
      type="button"
      className={tw(`${baseStyle} ${twModifiers ?? ``}`, secondaryButtonStyle)}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

const LinkButton = ({ twModifiers, children, linkTo, ...rest }: ILinkButton) => (
  <a
    type="button"
    href={linkTo}
    target="_blank"
    rel="noreferrer"
    className={tw(`${baseStyle} ${twModifiers ?? ``}`, primaryButtonStyle)}
    {...rest}
  >
    {children}
  </a>
);

const SocialMediaButton = ({ children, linkTo, hoverColor }: ISocialMediaButton) => {
  const socialMediaStyles = css`
    color: #000;
    fill: #000;
    font-size: 24px;
    border-radius: 6px;
    &:hover {
      color: ${hoverColor} !important;
      fill: ${hoverColor} !important;
    }
    svg {
      width: 24px;
      height: 24px;
    }
  `;

  return (
    <a
      type="button"
      href={linkTo}
      target="_blank"
      rel="noreferrer"
      className={tw(`font-sans font-medium py-2 px-3 rounded cursor-pointer shadow-md`, socialMediaStyles)}
    >
      {children}
    </a>
  );
};

const LinkedinButton = ({ modifier, children, onClick, disabled, ...rest }: ILinkedinButton) => {
  const linkedinButtonStyle = `font-sans font-medium flex items-center py-2 px-4 border rounded`;
  const styles = `bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-700`;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`button-disabled ${tw(`${linkedinButtonStyle} ${styles} ${modifier ?? ``}`)}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export { PrimaryButton, SecondaryButton, LinkButton, SocialMediaButton, LinkedinButton };
