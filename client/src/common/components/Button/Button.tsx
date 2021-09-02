import AntDButton from 'antd/es/button';
import React from 'react';
import clsx from 'clsx';

export type ButtonProps = {
  buttonText: string;
  buttonType?: ButtonTypes;
  onClick?: () => void | Promise<void>;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  htmlType?: ButtonHtmlType;
  attrs?: { [key: string]: string };
};

export enum ButtonTypes {
  Default = 'default',
  Primary = 'primary',
  Text = 'text',
  Link = 'link',
  Dashed = 'dashed',
  Ghost = 'ghost'
}

export type ButtonHtmlType = 'button' | 'submit' | 'reset';

export const Button = ({
  buttonText,
  buttonType = ButtonTypes.Default,
  onClick,
  className,
  disabled,
  loading,
  htmlType,
  attrs
}: ButtonProps): JSX.Element => {
  return (
    <AntDButton
      onClick={onClick}
      type={buttonType}
      htmlType={htmlType}
      className={clsx([className, `btn-${buttonType}`])}
      disabled={disabled}
      loading={loading}
      {...attrs}
    >
      {buttonText}
    </AntDButton>
  );
};

export default React.memo(Button);
