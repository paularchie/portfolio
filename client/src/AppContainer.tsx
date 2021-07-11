import React, { useEffect } from "react";
import { useHistory } from "react-router";
import NavBar, { NavItem } from "./common/components/NavBar/NavBar";

//TODO: create Footer component
const Footer = (): JSX.Element => {
  return <footer className="border-t h-12 border-gray-50">Footer</footer>;
};

const navItems: NavItem[] = [
  {
    url: "/",
    label: "Home"
  },
  {
    url: "/login",
    label: "Login"
  },
  {
    url: "/signup",
    label: "Sign up"
  },
  {
    url: "/products",
    label: "Products",
    items: [
      {
        url: "/product1",
        label: "Product1"
      },
      {
        url: "/product2",
        label: "Product2"
      },
      {
        url: "/product3",
        label: "Product3"
      }
    ]
  }
];

const AppContainer = ({ children }): JSX.Element => {
  const history = useHistory();

  const handleClick = (url: string): void => {
    history.push(url);
  };

  return (
    <div className="flex flex-col h-full">
      <NavBar navItems={navItems} onClick={handleClick} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default AppContainer;
