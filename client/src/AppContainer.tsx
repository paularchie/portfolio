import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useGetCurrentUser } from './common/hooks/useGetCurrentUser';
import { useErrorContext } from './common/contexts/HttpErrorContext';
import { UserOutlined } from '@ant-design/icons';
import { navItems } from './common/utils/constants';
import NavBar from './common/components/NavBar/NavBar';

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
