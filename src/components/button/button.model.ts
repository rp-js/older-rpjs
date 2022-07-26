interface IButton {
  disabled?: boolean;
  children: React.ReactNode;
  twModifiers?: string;
  onClick?: React.MouseEventHandler;
}

interface ILinkButton extends IButton {
  linkTo: string;
}

interface ISocialMediaButton {
  children: React.ReactNode;
  linkTo: string;
  hoverColor: string;
}

interface ILinkedinButton {
  children: React.ReactNode;
  modifier?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export type { IButton, ILinkButton, ISocialMediaButton, ILinkedinButton };
