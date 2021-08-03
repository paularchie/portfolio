import React from 'react';
import { Menu } from 'antd';
import { MenuMode } from 'antd/lib/menu';
const { SubMenu } = Menu;
import clsx from 'clsx';

export type NavItem = {
  url?: string;
  label?: string;
  icon?: JSX.Element;
  items?: NavItem[];
  moveRight?: boolean;
};

export type NavBarProps = {
  navItems: NavItem[];
  onClick: (url?: string) => void;
  mode?: MenuMode;
};

const NavBar = ({ navItems, mode, onClick }: NavBarProps): JSX.Element => {
  return (
    <nav className="nav-container">
      <Menu mode={mode || 'horizontal'}>
        {navItems.map((item: NavItem) => {
          return item.items ? (
            <SubMenu
              className={clsx({ 'move-right': item.moveRight })}
              key="SubMenu"
              title={item.label}
              icon={item.icon}
            >
              {item.items.map((subItem) => {
                return (
                  <Menu.Item key={subItem.label}>{subItem.label}</Menu.Item>
                );
              })}
            </SubMenu>
          ) : (
            <Menu.Item
              key={item.label}
              onClick={() => onClick(item.url)}
              icon={item.icon}
            >
              {item.label}
            </Menu.Item>
          );
        })}
      </Menu>
    </nav>
  );
};

export default React.memo(NavBar);
