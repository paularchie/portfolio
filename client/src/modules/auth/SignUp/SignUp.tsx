import { Button, ButtonTypes } from '../../../common/components/Button/Button';
import React, { useEffect, useState } from 'react';
import { Input, InputTypes } from '../../../common/components/Input/Input';
import { useHistory } from 'react-router';
import { useSignUp } from '../../../common/hooks/useSignUp';
import { UserSignUpInput, ValidationError } from '@portfolio/common';

const SignUp = (): JSX.Element => {
  const history = useHistory();

  const [credentials, setCredentials] = useState<UserSignUpInput>({
    email: '',
    password: ''
  });

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const { mutate: signUp, data, isLoading } = useSignUp();

  useEffect(() => {
    if (data) {
      if ('id' in data) {
        history.push('/login');
      }
      if ('errors' in data) {
        handleErrors(data.errors);
      }
    }
  }, [data]);

  const handleErrors = (errors: ValidationError[]) => {
    const err = errors.reduce((acc, { field, message }) => {
      return {
        ...acc,
        [field]: message
      };
    }, {});

    setValidationErrors(err);
  };

  const onChange = (value: string, fieldName: string): void => {
    setCredentials({
      ...credentials,
      [fieldName]: value
    });
  };

  const onSubmit = (event: any): void => {
    event.preventDefault();
    signUp(credentials);
  };

  const isButtonDisabled = (): boolean => {
    return !(credentials.email && credentials.password);
  };

  return (
    <div className="flex justify-around h-full">
      <div className="w-64 mt-36">
        <h1 className="text-center mb-8">Sign Up</h1>
        <form className="flex flex-col" onSubmit={onSubmit}>
          <Input
            id="email"
            label="Email Address"
            name="email"
            type={InputTypes.Email}
            onChange={onChange}
            showError={!!validationErrors['email']}
            errors={validationErrors['email']}
          />
          <Input
            id="password"
            label="Password"
            name="password"
            type={InputTypes.Password}
            onChange={onChange}
            showError={!!validationErrors['password']}
            errors={validationErrors['password']}
          />
          <Button
            buttonText="Sign Up"
            buttonType={ButtonTypes.Primary}
            htmlType="submit"
            className="mt-4"
            disabled={isButtonDisabled()}
            loading={isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
