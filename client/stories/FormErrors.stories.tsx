import React from "react";
import FormErrors, {
  FormErrorsProps
} from "../src/common/components/FormErrors/FormErrors";

export default {
  component: FormErrors,
  title: "FormErrors"
};

const Template = (args: FormErrorsProps) => <FormErrors {...args} />;

export const SingleError = Template.bind({});
SingleError.args = {
  errors: "Error message"
};

export const ErrorsArray = Template.bind({});
ErrorsArray.args = {
  errors: ["Error message 1", "Error message 2", "Error message 3"]
};
