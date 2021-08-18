import { Button, ButtonTypes } from '../../../common/components/Button/Button';
import React, { useEffect, useState } from 'react';
import { Input, InputTypes } from '../../../common/components/Input/Input';
import { useSignIn } from '../../../common/hooks/useSignIn';
import { useHistory } from 'react-router';
import { UserLoginInput } from '@portfolio/common';

const SignIn = (): JSX.Element => {
  const history = useHistory();

  const [credentials, setCredentials] = useState<UserLoginInput>({
    email: '',
    password: ''
  });

  const { refetch: signIn, isLoading, error, isSuccess } = useSignIn(credentials);

  useEffect(() => {
    isSuccess && history.push('/');
  }, [isSuccess]);

  const onChange = (value: string, fieldName: string): void => {
    setCredentials({
      ...credentials,
      [fieldName]: value
    });
  };

  const onSubmit = (event: any): void => {
    event.preventDefault();
    signIn();
  };

  const isButtonDisabled = (): boolean => {
    return !(credentials.email && credentials.password);
  };

  const getErrorMessage = (): string | null => {
    return error && error[0]?.message;
  };

  return (
    <div className="flex justify-around h-full">
      <div className="w-64 mt-36">
        <h1 className="text-center mb-8">Sign In</h1>
        <form className="flex flex-col" onSubmit={onSubmit}>
          <Input
            id="email"
            label="Email Address"
            name="email"
            type={InputTypes.Email}
            onChange={onChange}
            showError={!!getErrorMessage()}
          />
          <Input
            id="password"
            label="Password"
            name="password"
            type={InputTypes.Password}
            onChange={onChange}
            errors={getErrorMessage()}
          />
          <Button
            buttonText="Login"
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

export default SignIn;
