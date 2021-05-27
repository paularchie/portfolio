import { useEffect, useState } from "react";

import { LoginCredentials } from "./auth-types";
import { queryWithVariables } from "../../common/utils/functions";
import { signIn } from "./auth-api";
import { useQuery } from "react-query";
import { useHistory } from "react-router";

export const useAuthClient = (credentials: LoginCredentials) => {
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const { data, refetch: singInQuery, isLoading, error } = useQuery<any, any>(
    ["getUser", credentials],
    queryWithVariables(signIn),
    {
      enabled: false,
      retry: false,
      onSuccess: () => history.push("/")
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
