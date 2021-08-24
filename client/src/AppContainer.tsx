import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useGetCurrentUser } from './common/hooks/useGetCurrentUser';
import { useErrorContext } from './common/contexts/HttpErrorContext';
import NavBar, { NavItem } from './common/components/NavBar/NavBar';
import { useSignOut } from './common/hooks/useLogOut';
import { UserOutlined } from '@ant-design/icons';

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

const AppContainer = ({ children }): JSX.Element => {
  const ctx = useErrorContext();
  const history = useHistory();
  const [currentPath, setCurrentPath] = useState('');

  const { data: user, isFetching } = useGetCurrentUser();
  const { mutate: signOut } = useSignOut();

  const isLoggedIn = (): boolean => {
    return !!user && !isFetching;
  };

  const navItems: NavItem[] = [
    {
      url: '/',
      label: 'Home',
      key: '/'
    },
    {
      url: '/login',
      label: 'Login',
      moveRight: true,
      key: '/login',
      show: !isLoggedIn()
    },
    {
      url: '/signup',
      label: 'Sign up',
      key: '/signup',
      show: !isLoggedIn()
    },
    {
      icon: <UserOutlined />,
      items: [
        {
          label: 'Log out',
          key: 'logout',
          show: isLoggedIn(),
          moveRight: true,
          onClick: signOut
        }
      ],
      key: 'account'
    }
  ];

  useEffect(() => {
    const unsubscribe = history.listen(({ pathname }) => {
      setCurrentPath(pathname);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setCurrentPath(history.location.pathname);
  }, [history]);

  const handleClick = (url?: string): void => {
    if (url) {
      history.push(url);
    }
  };

  //TODO: implement error notification banner
  useEffect(() => {
    console.log('!!!!', ctx.error);
  }, [ctx.error]);

  return (
    <div className="flex flex-col h-full">
      <NavBar navItems={navItems} onClick={handleClick} selectedKeys={[currentPath]} />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* <ReactQueryDevtools /> */}
    </div>
  );
};

export default AppContainer;
