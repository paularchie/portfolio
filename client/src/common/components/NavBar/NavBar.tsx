import React from 'react';

export type NavItem = {
  url: string;
  label: string
}

export type NavBarProps = {
  navItems: NavItem[]
}

const NavBar = ({ navItems }: NavBarProps): JSX.Element => {
  console.log({ navItems })
  return <nav className="border-b h-12 border-grey-50">Navbar</nav>;
}

export default React.memo(NavBar);
