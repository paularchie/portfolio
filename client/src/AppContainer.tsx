import React, { useEffect } from 'react';
import { useGetCurrentUser } from './common/hooks/useGetCurrentUser';
import { useErrorContext } from './common/contexts/HttpErrorContext';
import NavBar from './common/components/NavBar/NavBar';
import { useNav } from './common/hooks/useNav';
import { useSignOut } from './common/hooks/useLogOut';
import Routes from './Routes';

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

const AppContainer = (): JSX.Element => {
  const ctx = useErrorContext();
  const { data: user, isFetching } = useGetCurrentUser();
  const { mutate: signOut, data: isSignedOut } = useSignOut();
  const { navItems, handleNavItemClick, currentPath } = useNav(
    isFetching,
    !!user,
    signOut,
    isSignedOut
  );

  //TODO: implement error notification banner
  useEffect(() => {
    console.log('!!!!', ctx.error);
  }, [ctx.error]);

  return (
    <div className="flex flex-col h-full">
      <NavBar navItems={navItems} onClick={handleNavItemClick} selectedKeys={[currentPath]} />
      <main className="flex-1">
        <Routes />
      </main>
      <Footer />
      {/* <ReactQueryDevtools /> */}
    </div>
  );
};

export default AppContainer;
