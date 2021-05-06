import React from 'react';
import { Button as AntDButton } from 'antd';

export type ButtonProps = {
  buttonText: string;
  buttonType?: ButtonTypes;
  onClick?: () => void | Promise<void>;
  className?: string;
};

export enum ButtonTypes {
  Default = 'default',
  Primary = 'primary',
  Text = 'text',
  Link = 'link',
  Dashed = 'dashed',
  Ghost = 'ghost'
}

export const Button = ({
  buttonText,
  buttonType = ButtonTypes.Default,
  onClick,
  className
}: ButtonProps): JSX.Element => {
  return (
    <AntDButton onClick={onClick} type={buttonType} className={className}>
      {buttonText}
    </AntDButton>
  );
};

export default React.memo(Button);
