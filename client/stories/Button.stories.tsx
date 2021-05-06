import { Story } from '@storybook/react/types-6-0';
import React from 'react';
import { Button, ButtonProps, ButtonTypes } from '../components/Button/Button';

export default {
  component: Button,
  title: 'Button'
};

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  buttonText: 'Default'
};

export const Primary = Template.bind({});
Primary.args = {
  buttonText: 'Primary',
  buttonType: ButtonTypes.Primary
};

export const Text = Template.bind({});
Text.args = {
  buttonText: 'Text',
  buttonType: ButtonTypes.Text
};

export const Link = Template.bind({});
Link.args = {
  buttonText: 'Link',
  buttonType: ButtonTypes.Link
};

export const Dashed = Template.bind({});
Dashed.args = {
  buttonText: 'Dashed',
  buttonType: ButtonTypes.Dashed
};

export const Ghost = Template.bind({});
Ghost.args = {
  buttonText: 'Ghost',
  buttonType: ButtonTypes.Ghost
};
