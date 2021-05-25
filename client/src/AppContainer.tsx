import React from "react";

//TODO: create NavBar component
const NavBar = (): JSX.Element => {
  return <nav className="border-b h-12 border-grey-50">Navbar</nav>;
};

//TODO: create Footer component
const Footer = (): JSX.Element => {
  return <footer className="border-t h-12 border-gray-50">Footer</footer>
};

const AppContainer = ({ children }): JSX.Element => {
  return (
    <div className="flex flex-col h-full">
      <NavBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default AppContainer;
