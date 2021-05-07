import React from 'react';
import { Input as AntDInput } from 'antd';

// TODO: add more types when required
export enum InputTypes {
  Text = 'text',
  Password = 'password',
  Email = 'email'
}

export type InputProps = {
  id: string;
  name: string;
  label?: string;
  placeholder?: string;
  type?: InputTypes;
  onChange?: (value: string, name: string) => void;
};

export const Input = (props: InputProps): JSX.Element => {
  const {
    id,
    label,
    placeholder,
    type = InputTypes.Text,
    name,
    onChange
  } = props;

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    onChange && onChange(target.value, name);
  };

  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <AntDInput
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={handleChange}
      />
    </>
  );
};

export default React.memo(Input);
