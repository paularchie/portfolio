import React from 'react';
import { Menu } from 'antd';
const { SubMenu } = Menu;
import clsx from 'clsx';

export type NavItem = {
  url?: string;
  label?: string;
  icon?: JSX.Element;
  items?: NavItem[];
  moveRight?: boolean;
  key: string;
  selected?: boolean;
  show?: boolean;
};

export type MenuMode = 'horizontal' | 'vertical' | 'inline';

export type NavBarProps = {
  navItems: NavItem[];
  onClick: (url?: string) => void;
  mode?: MenuMode;
  selectedKeys: string[];
};

const NavBar = ({ navItems, mode, onClick, selectedKeys }: NavBarProps): JSX.Element => {
  const getItemCommonProps = (item: NavItem) => {
    return (
      item.show !== false && {
        className: clsx({ 'move-right': item.moveRight }),
        key: item.key,
        icon: item.icon,
        onClick: () => onClick(item.url)
      }
    );
  };

  const isVisible = (item: NavItem): boolean => {
    return item.show !== false;
  };

  return (
    <nav className="nav-container">
      <Menu mode={mode || 'horizontal'} selectedKeys={selectedKeys}>
        {navItems.map((item: NavItem) => {
          return isVisible(item) && item.items ? (
            <SubMenu title={item.label} {...getItemCommonProps(item)}>
              {item.items.map((subItem: NavItem) => {
                return isVisible(subItem) && <Menu.Item {...getItemCommonProps(subItem)}>{subItem.label}</Menu.Item>;
              })}
            </SubMenu>
          ) : (
            isVisible(item) && <Menu.Item {...getItemCommonProps(item)}>{item.label}</Menu.Item>
          );
        })}
      </Menu>
    </nav>
  );
};

export default React.memo(NavBar);
