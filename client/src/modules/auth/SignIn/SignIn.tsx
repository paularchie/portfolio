import { Button, ButtonTypes } from '../../../common/components/Button/Button';
import React, { useEffect, useState } from 'react';
import { Input, InputTypes } from '../../../common/components/Input/Input';
import { useSignIn } from '../../../common/hooks/useSignIn';
import { useHistory } from 'react-router';
import { UserLoginInput } from '@portfolio/common/build/types';
import { useQueryClient } from 'react-query';
import { CURRENT_USER } from '../../../common/utils/query-keys';

const SignIn = (): JSX.Element => {
  const history = useHistory();

  const [credentials, setCredentials] = useState<UserLoginInput>({
    email: '',
    password: ''
  });
  const queryClient = useQueryClient();

  const [errorMessage, setErrorMessage] = useState('');

  const { mutate: signIn, data, isLoading } = useSignIn();

  useEffect(() => {
    if (data) {
      if ('id' in data) {
        history.push('/');
        queryClient.invalidateQueries(CURRENT_USER);
      }
      if ('errors' in data) {
        setErrorMessage(data.errors[0].message);
      }
    }
  }, [data]);

  const onChange = (value: string, fieldName: string): void => {
    setCredentials({
      ...credentials,
      [fieldName]: value
    });
  };

  const onSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    signIn(credentials);
  };

  const isButtonDisabled = (): boolean => {
    return !(credentials.email && credentials.password);
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
            showError={!!errorMessage}
          />
          <Input
            id="password"
            label="Password"
            name="password"
            type={InputTypes.Password}
            onChange={onChange}
            errors={errorMessage}
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
