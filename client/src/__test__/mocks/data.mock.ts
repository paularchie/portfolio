import { NavBarProps } from '../../common/components/NavBar/NavBar';

export const navBarProps: NavBarProps = {
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
    }
  ],
  selectedKeys: ['home'],
  onClick: () => {}
};
