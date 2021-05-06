import React from 'react';

export type FormErrorsProps = {
  errors: string | string[];
};

const FormErrors = ({ errors }: FormErrorsProps): JSX.Element => {
  return (
    <>
      {errors instanceof Array ? (
        <>
          {errors.map((error: string) => (
            <p className="m-0">{error}</p>
          ))}
        </>
      ) : (
        <p>{errors}</p>
      )}
    </>
  );
};

export default FormErrors;
