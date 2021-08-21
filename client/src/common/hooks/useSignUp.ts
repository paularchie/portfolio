import { useMutation } from 'react-query';
import { useRequest } from '../utils/client';
import queries from '../../graphql/Query';
import { SignUpResult, UserSignUpInput } from '@portfolio/common/build/types';

export const useSignUp = () => {
  const { request } = useRequest();
  return useMutation(async (data: UserSignUpInput): Promise<SignUpResult> => {
    const res = await request(queries.signUpMutation, { data });
    return res.signUp;
  });
};
