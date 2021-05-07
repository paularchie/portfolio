import React from 'react';
import { Input, InputProps, InputTypes } from '../src/common/components/Input/Input';

export default {
  component: Input,
  title: 'Input'
};

const Template = (args: InputProps) => <Input {...args} />;

const commonArgs = {
  id: 'id',
  name: 'field name'
};

export const Default = Template.bind({});
Default.args = {
  ...commonArgs
};

export const Label = Template.bind({});
Label.args = {
  ...commonArgs,
  label: 'label'
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  ...commonArgs,
  placeholder: 'placeholder'
};

export const Password = Template.bind({});
Password.args = {
  ...commonArgs,
  type: InputTypes.Password
};
