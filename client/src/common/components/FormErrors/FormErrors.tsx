import React from 'react';

export type FormErrorsProps = {
  errors: string | string[];
};

const FormErrors = ({ errors }: FormErrorsProps): JSX.Element => {
  const getErrorElement = (errorText: string): JSX.Element => {
    return (
      <p className="m-0 error-text" key={errorText} data-cy="error-message">
        {errorText}
      </p>
    );
  };

  return (
    <>
      {errors instanceof Array ? (
        <>{errors.map((error: string) => getErrorElement(error))}</>
      ) : (
        <>{getErrorElement(errors)}</>
      )}
    </>
  );
};

export default FormErrors;
