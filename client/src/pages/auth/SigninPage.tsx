import React from 'react';
import { Button, ButtonTypes } from '../../common/components/Button/Button';
import { Input } from '../../common/components/Input/Input';

const SigninPage = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');


  const onSubmit = async (event: any): Promise<void> => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="">Sign In</h1>
      <div className="w-64">
        <form className="flex flex-col" onSubmit={onSubmit}>
          <Input
            id="password"
            label="Password"
            name="password"
          // onChange={handleChange}
          />
          <Input
            id="email"
            label="Email Address"
            name="email"
          // onChange={handleChange}
          />
          {/* {errors} */}
          <Button
            buttonText="Submit"
            buttonType={ButtonTypes.Primary}
            // onClick={handleSubmit}
            className="mt-4"
          />
        </form>
      </div>
    </div>
  );
};

export default SigninPage;
