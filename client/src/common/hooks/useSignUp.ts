import { useMutation } from 'react-query';
import { useRequest } from '../utils/client';
import queries from '../../graphql/Query';
import { SignUpResult, UserSignUpInput } from '@portfolio/common';

export const useSignUp = () => {
  const { request } = useRequest();
  return useMutation<SignUpResult, Error>(async (data: UserSignUpInput) => {
    const res = await request(queries.signUpMutation, { data });
    return res.signUp;
  });
};
