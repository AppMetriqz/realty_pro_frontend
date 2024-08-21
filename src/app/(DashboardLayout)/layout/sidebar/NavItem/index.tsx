import React from 'react';
// mui imports
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavGroup = {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: any;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

interface ItemType {
  item: NavGroup;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  hideMenu?: any;
  level?: number | any;
}

const NavItem = ({ item, level, onClick }: ItemType) => {
  const pathname = usePathname();
  const Icon = item.icon;
  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    '.MuiButtonBase-root': {
      marginTop: '10px',
      whiteSpace: 'nowrap',
      marginBottom: '2px',
      padding: '2px 10px',
      borderRadius: '8px',
      backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
      color: '#505050',
      fontSize: '16px',
      fontWeight: 400,
      paddingLeft: '10px',
      '&:hover': {
        backgroundColor: '#FFF1E6',
        color: '#505050',
      },
      '&.Mui-selected': {
        backgroundColor: '#FFF1E6',
        color: '#505050',
        '&:hover': {
          backgroundColor: '#FFF1E6',
          color: '#505050',
        },
      },
    },
  }));

  return (
    <List component="div" disablePadding key={item.id}>
      <ListItemStyled>
        <ListItemButton
          component={Link}
          href={item.href}
          disabled={item.disabled}
          selected={pathname.includes(item.href)}
          target={item.external ? '_blank' : ''}
          onClick={onClick}
        >
          <ListItemIcon
            sx={{
              minWidth: '36px',
              p: '3px 10px',
              color: 'inherit',
            }}
          >
            <Icon fill={'#505050'} />
          </ListItemIcon>
          <ListItemText>
            <>{item.title}</>
          </ListItemText>
        </ListItemButton>
      </ListItemStyled>
    </List>
  );
};

export default NavItem;
