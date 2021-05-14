import React, { useEffect, useState } from "react";
import { Button, ButtonTypes } from "../../common/components/Button/Button";
import { Input } from "../../common/components/Input/Input";
import axios from "axios";
import { useQuery } from "react-query";

const SignInPage = (): JSX.Element => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  // const withCredentials = (fn) => {
  //   return ({ queryKey }) => {
  //     return fn(queryKey[1]);
  //   };
  // };

  // const signIn = (credentials: LoginCredentials) => {
  //   return axios.post("/api/signin", credentials);
  // };

  const signIn = ({ queryKey }) => {
    const credentials = queryKey[1];
    return axios.post("/api/signin", credentials);
  };

  const { data, refetch, error } = useQuery(["getUser", credentials], signIn, {
    enabled: false,
    retry: false
  });

  useEffect(() => {
    error && setErrorMessage(error.response.data.errors[0].message);
  }, [error]);

  const onChange = (value: string, fieldName: string): void => {
    errorMessage && setErrorMessage("");

    setCredentials({
      ...credentials,
      [fieldName]: value
    });
  };

  const onSubmit = async (event: any): Promise<void> => {
    event.preventDefault();
    refetch();
  };

  const isButtonDisabled = (): boolean => {
    return !(credentials.email && credentials.password);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="">Sign In</h1>
      <div className="w-64">
        <form className="flex flex-col">
          <Input
            id="password"
            label="Password"
            name="password"
            onChange={onChange}
            errors={errorMessage && []}
          />
          <Input
            id="email"
            label="Email Address"
            name="email"
            onChange={onChange}
            errors={errorMessage}
          />
          <Button
            buttonText="Submit"
            buttonType={ButtonTypes.Primary}
            className="mt-4"
            onClick={onSubmit}
            disabled={isButtonDisabled()}
          />
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
