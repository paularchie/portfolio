import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import NavBar from './common/components/NavBar/NavBar';
import { UserOutlined } from '@ant-design/icons';
import { useErrorContext } from './common/contexts/HttpErrorContext';
import { navItems } from './common/utils/constants';

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
    setCurrentPath(history.location.pathname);
  }, [history]);

  const handleClick = (url: string): void => {
    history.push(url);
    url && setCurrentPath(url);
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
