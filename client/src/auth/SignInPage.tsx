import { Button, ButtonTypes } from "../common/components/Button/Button";
import React, { useState } from "react";

import { Input } from "../common/components/Input/Input";
import { LoginCredentials } from "./auth-types";
import { useAuthClient } from "./useAuthClient";

const SignInPage = (): JSX.Element => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: ""
  });

  const { signIn, isLoading, errorMessage } = useAuthClient(credentials);

  const onChange = (value: string, fieldName: string): void => {
    setCredentials({
      ...credentials,
      [fieldName]: value
    });
  };

  const onSubmit = async (event: any): Promise<void> => {
    event.preventDefault();
    signIn();
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
            onChange={onChange}
            errors={errorMessage && []}
          />
          <Input
            id="password"
            label="Password"
            name="password"
            onChange={onChange}
            errors={errorMessage}
          />
          <Button
            buttonText="Submit"
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

export default SignInPage;
