import React from "react";
import { Button as AntDButton } from "antd";
import clsx from "clsx";

export type ButtonProps = {
  buttonText: string;
  buttonType?: ButtonTypes;
  onClick?: (event: any) => void | Promise<void>;
  className?: string;
  disabled?: boolean;
};

export enum ButtonTypes {
  Default = "default",
  Primary = "primary",
  Text = "text",
  Link = "link",
  Dashed = "dashed",
  Ghost = "ghost"
}

export const Button = ({
  buttonText,
  buttonType = ButtonTypes.Default,
  onClick,
  className,
  disabled
}: ButtonProps): JSX.Element => {
  return (
    <AntDButton
      onClick={onClick}
      type={buttonType}
      className={clsx([className, `btn-${buttonType}`])}
      disabled={disabled}
    >
      {buttonText}
    </AntDButton>
  );
};

export default React.memo(Button);
