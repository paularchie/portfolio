import React from 'react';
import AntDInput from 'antd/es/input';
import FormErrors from '../FormErrors/FormErrors';
import clsx from 'clsx';

export enum InputTypes {
  Text = 'text',
  Password = 'password',
  Email = 'email'
}

export type InputProps = {
  id: string;
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  type?: InputTypes;
  onChange?: (value: string, name: string) => void;
  showError?: boolean;
  errors?: string | string[] | null | undefined;
};

export const Input = (props: InputProps): JSX.Element => {
  const {
    id,
    name,
    label,
    className,
    placeholder,
    type = InputTypes.Text,
    onChange,
    showError,
    errors
  } = props;

  const handleChange = ({
    target
  }: React.ChangeEvent<HTMLInputElement>): void => {
    onChange && onChange(target.value, name);
  };

  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <AntDInput
        id={id}
        name={name}
        className={clsx([className, { 'error-input': showError || errors }])}
        placeholder={placeholder}
        type={type}
        onChange={handleChange}
        data-cy="input-field"
      />
      {errors && <FormErrors errors={errors} />}
    </>
  );
};

export default React.memo(Input);
