import React from "react";
import { Menu } from "antd";
import { MenuMode } from "antd/lib/menu";

export type NavItem = {
  url: string;
  label: string;
  items?: NavItem[];
};

export type NavBarProps = {
  navItems: NavItem[];
  onClick: (url: string) => void;
  mode?: MenuMode;
};

const NavBar = ({ navItems, mode, onClick }: NavBarProps): JSX.Element => {
  // return <nav className="border-b h-12 border-grey-50">Navbar</nav>;

  return (
    <>
      <Menu mode={mode || "horizontal"}>
        {navItems.map((item: NavItem) => {
          return (
            <Menu.Item key={item.label} onClick={() => onClick(item.url)}>
              {item.label}
              {/* if item.items show submenu */}
            </Menu.Item>
          );
        })}
      </Menu>
    </>
  );
};

export default React.memo(NavBar);