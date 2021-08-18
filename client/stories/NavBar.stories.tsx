import { Story } from "@storybook/react/types-6-0";
import React from "react";
import { NavBarProps, NavBar } from "../src/common/components/NavBar/NavBar";
import { UserOutlined } from "@ant-design/icons";
import "../styles/nav-bar.css";

export default {
  component: NavBar,
  title: "NavBar"
};

const Template: Story<NavBarProps> = (args) => <NavBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  navItems: [
    {
      url: "/",
      label: "Home"
    },
    {
      icon: <UserOutlined />
    },
    {
      url: "/login",
      label: "Login"
    },
    {
      url: "/signup",
      label: "Sign up"
    },
    {
      url: "/products",
      // label: "Products",
      moveRight: true,
      icon: <UserOutlined />,
      items: [
        {
          url: "/product1",
          label: "Product1"
        },
        {
          url: "/product2",
          label: "Product2"
        },
        {
          url: "/product3",
          label: "Product3"
        }
      ]
    }
  ]
};
