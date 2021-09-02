import React, {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useMemo
} from 'react';

type HttpError = {
  code?: null | string;
  message?: null | string;
};

export const initialState: HttpError = {
  code: null,
  message: null
};

type HttpErrorContext = {
  error: HttpError | null;
  setError: Dispatch<SetStateAction<HttpError>>;
};

const ErrorContext = createContext<HttpErrorContext>({ error: null, setError: () => {} });

export function HttpErrorProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [error, setError] = useState(initialState);
  const ctx = useMemo(() => ({ error, setError }), [error]);
  return <ErrorContext.Provider value={ctx}>{children}</ErrorContext.Provider>;
}

export const useErrorContext = (): HttpErrorContext => useContext(ErrorContext);
