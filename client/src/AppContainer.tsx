import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { ReactQueryDevtools } from "react-query-devtools";
import { useGetCurrentUser } from "./common/hooks/useGetCurrentUser";
import { useSignIn } from "./common/hooks/useSignIn";
import { useErrorContext } from "./common/contexts/HttpErrorContext";

//TODO: create NavBar component
const NavBar = (): JSX.Element => {
  const { data: currentUser, isFetching } = useGetCurrentUser();

  return (
    <nav className="border-b h-12 border-grey-50">
      <div>{currentUser ? currentUser.username : !isFetching && "login"}</div>
    </nav>
  );
};

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

  useEffect(() => {
    console.log("!!!!", ctx.error);
  }, [ctx.error]);

  return (
    <div className="flex flex-col h-full">
      <NavBar />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* <ReactQueryDevtools /> */}
    </div>
  );
};

export default AppContainer;
