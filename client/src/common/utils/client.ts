import { GraphQLClient } from "graphql-request";
import { useEffect } from "react";
import { useErrorContext } from "../contexts/HttpErrorContext";

export const BASE_URL = `http://localhost:4000/graphql`;

const client = new GraphQLClient(BASE_URL, {
  credentials: "include",
  mode: "cors"
});

export const useRequest = () => {
  const { setError } = useErrorContext();
  return {
    request: async (a, b) => {
      try {
        return await client.request(a, b);
      } catch (err) {
        const code = err.response.errors[0].extensions.code;
        const message = err.response.errors[0].message;
        if (code === "INTERNAL_SERVER_ERROR") {
          // alert("handle error");
          setError({ code, message });

          throw new Error("Internal server error");
        } else {
          throw err.response.errors;
        }
      }
    }
  };
};

export default client;
