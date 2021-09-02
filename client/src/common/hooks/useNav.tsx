import React, { useEffect, useState } from 'react';
import { UseMutateFunction, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';
import { UserOutlined } from '@ant-design/icons';
import { NavItem } from '../components/NavBar/NavBar';
import { CURRENT_USER } from '../utils/query-keys';

export type ClickHandler = UseMutateFunction<unknown, unknown, unknown, unknown> | (() => void);

export const useNav = (
  isFetching: boolean,
  isLoggedIn: boolean,
  onSignOut: ClickHandler,
  isSignedOut: boolean
): { navItems: NavItem[]; handleNavItemClick: ClickHandler; currentPath: string } => {
  const history = useHistory();
  const queryClient = useQueryClient();

  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (isSignedOut) {
      queryClient.invalidateQueries(CURRENT_USER);
    }
  }, [isSignedOut]);

  useEffect(() => {
    const unsubscribe = history.listen(({ pathname }) => {
      setCurrentPath(pathname);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setCurrentPath(history.location.pathname);
  }, [history]);

  const handleNavItemClick = (url?: string): void => {
    if (url) {
      history.push(url);
    }
  };

  const navItems: NavItem[] = [
    {
      url: '/',
      label: 'Home',
      key: '/'
    },
    {
      url: '/login',
      label: 'Log in',
      moveRight: true,
      key: '/login',
      show: !isFetching && !isLoggedIn
    },
    {
      url: '/signup',
      label: 'Sign up',
      key: '/signup',
      show: !isFetching && !isLoggedIn
    },
    {
      icon: <UserOutlined />,
      moveRight: true,
      items: [
        {
          label: 'Log out',
          key: 'logout',
          onClick: onSignOut
        }
      ],
      key: 'account',
      show: !isFetching && isLoggedIn,
      attrs: { 'data-cy': 'user-icon' }
    }
  ];

  return {
    navItems,
    handleNavItemClick,
    currentPath
  };
};
