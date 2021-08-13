import { Button, ButtonTypes } from '../../../common/components/Button/Button';
import React, { useEffect, useState } from 'react';
import { Input, InputTypes } from '../../../common/components/Input/Input';
import { LoginCredentials } from '../auth-types';
import { useHistory } from 'react-router';
import { useSignUp } from '../../../common/hooks/useSignUp';

const SignUp = (): JSX.Element => {
  const history = useHistory();

  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const signUp = useSignUp();

  const { data, isLoading} = signUp;

  console.log({ data });

  useEffect(() => {
    if (data?.id) {
      history.push('/auth/login');
    }
    if ((data as any)?.errors) {
      handleErrors();
    }
  }, [data]);

  const handleErrors = () => {
    const err = (data as any).errors.reduce((acc, { field, message }) => {
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
    signUp.mutate(credentials);
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
