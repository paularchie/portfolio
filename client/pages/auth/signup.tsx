import React, { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import Input, { InputTypes } from '../../components/Input/Input';
import Button, { ButtonTypes } from '../../components/Button/Button';

export function SignUpPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password
    },
    onSuccess: () => Router.push('/')
  });

  async function handleSubmit(): Promise<void> {
    await doRequest();
  }

  function handleChange(value: string, fieldName: string): void {
    fieldName === 'email' && setEmail(value);
    fieldName === 'password' && setPassword(value);
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="">Sign Up</h1>
      <div className="w-64">
        <form className="flex flex-col">
          <Input
            id="email"
            label="Email Address"
            name="email"
            onChange={handleChange}
          />
          <Input
            id="password"
            label="Password"
            type={InputTypes.Password}
            name="password"
            onChange={handleChange}
          />
          <Button
            buttonText="Submit"
            buttonType={ButtonTypes.Primary}
            onClick={handleSubmit}
            className="mt-4"
          />
        </form>
      </div>
      {errors}
    </div>
  );
}

export default React.memo(SignUpPage);
