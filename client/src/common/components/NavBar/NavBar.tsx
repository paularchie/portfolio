import React from "react";
import { Menu } from "antd";
import { MenuMode } from "antd/lib/menu";
import { render } from "react-dom";
const { SubMenu } = Menu;
import { UserOutlined } from "@ant-design/icons";

export type NavItem = {
  url?: string;
  label?: string;
  icon?: JSX.Element;
  items?: NavItem[];
  moveRight?: boolean;
};

export type NavBarProps = {
  navItems: NavItem[];
  onClick: (url: string) => void;
  mode?: MenuMode;
};

const NavBar = ({ navItems, mode, onClick }: NavBarProps): JSX.Element => {
  // return <nav className="border-b h-12 border-grey-50">Navbar</nav>;

  return (
    <div id="nav-container">
      <Menu mode={mode || "horizontal"}>
        {navItems.map((item: NavItem) => {
          return item.items ? (
            <SubMenu
              className={item.moveRight ? "move-right" : ""}
              key="SubMenu"
              title={item.label}
              icon={item.icon}
            >
              {item.items.map((subItem, index) => {
                console.log({ subItem });
                return (
                  <Menu.Item key={`setting: ${subItem.label}`}>{subItem.label}</Menu.Item>
                );
              })}
            </SubMenu>
          ) : (
            <Menu.Item
              key={item.label}
              onClick={() => onClick(item.url!)}
              icon={item.icon}
            >
              {item.label}
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
};

export default React.memo(NavBar);
