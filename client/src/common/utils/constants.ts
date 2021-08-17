import { NavItem } from '../components/NavBar/NavBar';

export const navItems: NavItem[] = [
  {
    url: '/',
    label: 'Home',
    key: '/'
  },
  {
    url: '/login',
    label: 'Login',
    moveRight: true,
    key: '/login'
  },
  {
    url: '/signup',
    label: 'Sign up',
    key: '/signup'
  }
  //TODO: Display it dynamically when the user is logged in
  // {
  //   icon: <UserOutlined />,
  //   items: [],
  //   key: 'account'
  // }
];
