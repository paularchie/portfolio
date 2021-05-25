import { useEffect, useState } from "react";

import { LoginCredentials } from "./auth-types";
import { queryWithVariables } from "../common/utils/functions";
import { signIn } from "./auth-api";
import { useQuery } from "react-query";

type ResponseError = {
  response: any
}

export const useAuthClient = (credentials: LoginCredentials) => {
  const [errorMessage, setErrorMessage] = useState("");

  const { data, refetch: singInQuery, isLoading, error } = useQuery<any, any>(
    ["getUser", credentials],
    queryWithVariables(signIn),
    {
      enabled: false,
      retry: false
    }
  );

  useEffect(() => {
    const message = error ? error.response.data.errors[0].message : "";
    setErrorMessage(message);
  }, [error]);

  return {
    signIn: singInQuery,
    isLoading,
    errorMessage
  };
};
