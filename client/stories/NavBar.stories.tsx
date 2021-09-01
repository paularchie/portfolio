import { Story } from '@storybook/react/types-6-0';
import React from 'react';
import NavBar, { NavBarProps } from '../src/common/components/NavBar/NavBar';
import { UserOutlined } from '@ant-design/icons';

export default {
  component: NavBar,
  title: 'NavBar'
};

const Template: Story<NavBarProps> = (args) => <NavBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  navItems: [
    {
      url: '/',
      label: 'Home',
      key: 'home'
    },
    {
      url: '/login',
      label: 'Log In',
      key: 'login',
      moveRight: true
    },
    {
      url: '/signup',
      label: 'Sign Up',
      key: 'signup'
    },
    {
      icon: <UserOutlined />,
      key: 'account',
      items: [
        {
          label: 'Log Out',
          key: 'logout'
        }
      ]
    }
  ],
  selectedKeys: ['home']
};
