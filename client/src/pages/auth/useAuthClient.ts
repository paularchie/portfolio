import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

export type LoginCredentials = {
  email: string;
  password: string;
};

const signIn = (credentials: LoginCredentials) => {
  console.log({credentials})
  return axios.post("/api/submit", credentials);
};

// const withVariables = (fn) => ({ queryKey }) => fn(queryKey[1]);

  const { data, refetch, error } = useQuery(
    ["getUser", credentials],
    withCredentials(signIn),
    {
      enabled: false,
      retry: false
    }
  );

  return {
    signInQuery: refetch,
    error
  };
};
