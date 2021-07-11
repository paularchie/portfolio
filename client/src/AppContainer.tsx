import React from "react";
import NavBar, { NavItem } from "./common/components/NavBar/NavBar";


//TODO: create Footer component
const Footer = (): JSX.Element => {
  return <footer className="border-t h-12 border-gray-50">Footer</footer>
};

const navItems: NavItem[] = [
  {
    url: '/',
    label: 'Home'
  },
  {
    url: '/contact',
    label: 'Contact'
  }
]

const AppContainer = ({ children }): JSX.Element => {
  return (
    <div className="flex flex-col h-full">
      <NavBar navItems={navItems} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default AppContainer;
