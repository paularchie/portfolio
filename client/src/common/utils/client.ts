import { GraphQLClient } from 'graphql-request';
import { useErrorContext } from '../contexts/HttpErrorContext';

export const BASE_URL = `http://localhost:4000/graphql`;

const client = new GraphQLClient(BASE_URL, {
  credentials: 'include',
  mode: 'cors'
});

export const useRequest = () => {
  const { setError } = useErrorContext();
  return {
    request: async (a: any, b: any) => {
      try {
        return await client.request(a, b);
      } catch (err) {
        if (err.response.errors[0]?.message) {
          throw [{ message: err.response.errors[0].message }];
        }
        const code = err.response.errors[0].extensions.code;
        const message = err.response.errors[0].message;
        if (code === 'INTERNAL_SERVER_ERROR') {
          setError({ code, message });
          throw new Error('Internal server error');
        } else {
          throw err.response.errors;
        }
      }
    }
  };
};

export default client;
