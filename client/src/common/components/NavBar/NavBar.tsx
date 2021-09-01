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
  onClick?: () => void;
};

export type MenuMode = 'horizontal' | 'vertical' | 'inline';

export type NavBarProps = {
  navItems: NavItem[];
  onClick: (url?: string) => void;
  mode?: MenuMode;
  selectedKeys: string[];
};

export type MenuItemProps = {
  key: string;
  className?: string;
  icon?: JSX.Element;
  onClick?: () => void;
};

const NavBar = ({ navItems, mode, onClick, selectedKeys }: NavBarProps): JSX.Element => {
  const getMenuItemProps = (item: NavItem): MenuItemProps => {
    return {
      className: clsx({ 'move-right': item.moveRight }),
      key: item.key,
      icon: item.icon,
      onClick: () => handleClick(item)
    };
  };

  const handleClick = (item: NavItem): void => {
    if (item.onClick) {
      return item.onClick();
    }
    if (onClick) {
      onClick(item.url);
    }
  };

  const isVisible = (item: NavItem): boolean => {
    return item.show !== false;
  };

  return (
    <nav className="nav-container">
      <Menu mode={mode || 'horizontal'} selectedKeys={selectedKeys} data-cy="nav-bar">
        {navItems.map((item: NavItem) => {
          return isVisible(item) && item.items ? (
            <SubMenu title={item.label} {...getMenuItemProps(item)}>
              {item.items.map((subItem: NavItem) => {
                return (
                  isVisible(subItem) && (
                    <Menu.Item {...getMenuItemProps(subItem)}>
                      <a href={subItem.url} onClick={(e: React.UIEvent) => e.preventDefault()}>
                        {subItem.label}
                      </a>
                    </Menu.Item>
                  )
                );
              })}
            </SubMenu>
          ) : (
            isVisible(item) && (
              <Menu.Item {...getMenuItemProps(item)}>
                <a href={item.url} onClick={(e: React.UIEvent) => e.preventDefault()}>
                  {item.label}
                </a>
              </Menu.Item>
            )
          );
        })}
      </Menu>
    </nav>
  );
};

export default React.memo(NavBar);
