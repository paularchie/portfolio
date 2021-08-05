import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import NavBar, { NavItem } from './common/components/NavBar/NavBar';
import { UserOutlined } from '@ant-design/icons';
import { ReactQueryDevtools } from 'react-query-devtools';
import { useGetCurrentUser } from './common/hooks/useGetCurrentUser';
import { useSignIn } from './common/hooks/useSignIn';
import { useErrorContext } from './common/contexts/HttpErrorContext';

//TODO: create Footer component
const Footer = (): JSX.Element => {
  return (
    <footer className="border-t h-12 border-gray-50">
      Copyright &copy; &nbsp;
      <a href="http://...">...</a>
      &nbsp;&nbsp;
      {new Date().getFullYear()}
    </footer>
  );
};

const navItems: NavItem[] = [
  {
    url: '/',
    label: 'Home'
  },
  {
    icon: <UserOutlined />
  },
  {
    url: '/login',
    label: 'Login'
  },
  {
    url: '/signup',
    label: 'Sign up'
  },
  {
    url: '/products',
    // label: "Products",
    moveRight: true,
    icon: <UserOutlined />,
    items: [
      {
        url: '/product1',
        label: 'Product1'
      },
      {
        url: '/product2',
        label: 'Product2'
      },
      {
        url: '/product3',
        label: 'Product3'
      }
    ]
  }
];

const AppContainer = ({ children }): JSX.Element => {
  const history = useHistory();

  const handleClick = (url: string): void => {
    history.push(url);
  };
  const ctx = useErrorContext();

  useEffect(() => {
    console.log('!!!!', ctx.error);
  }, [ctx.error]);

  return (
    <div className="flex flex-col h-full">
      <NavBar navItems={navItems} onClick={handleClick} />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* <ReactQueryDevtools /> */}
    </div>
  );
};

export default AppContainer;
