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
  error: HttpError;
  setError: Dispatch<SetStateAction<HttpError>>;
};

const ErrorContext = createContext<HttpErrorContext | null>(null);

export function HttpErrorProvider({ children }) {
  const [error, setError] = useState(initialState);
  const ctx = useMemo(() => ({ error, setError }), [error]);
  return <ErrorContext.Provider value={ctx}>{children}</ErrorContext.Provider>;
}

export const useErrorContext = () => useContext(ErrorContext)!;
