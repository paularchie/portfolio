import { useRequest } from '../utils/client';
import { logoutQuery } from '@portfolio/common/build/graphql/queries';
import { useMutation } from 'react-query';

export const useSignOut = () => {
  const { request } = useRequest();
  return useMutation(async () => {
    const res = await request(logoutQuery);
    return res.logout;
  });
};
