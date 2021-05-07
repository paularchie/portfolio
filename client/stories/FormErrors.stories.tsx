import React from 'react';
import FormErrors, { FormErrorsProps } from '../src/common/components/FormErrors/FormErrors';

export default {
  component: FormErrors,
  title: 'FormErrors'
};

const Template = (args: FormErrorsProps) => <FormErrors {...args} />;

export const SingleError = Template.bind({});
SingleError.args = {
  errors: 'Dummy error message'
};

export const ErrorsArray = Template.bind({});
ErrorsArray.args = {
  errors: ['Dummy error message 1', 'Dummy error message 2', 'Dummy error message 3']
};
