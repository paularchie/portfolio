export const queryWithVariables = (queryFn: Function) => {
  return ({ queryKey }: { queryKey: any[] }) => {
    return queryFn(...queryKey.slice(1));
  };
};
