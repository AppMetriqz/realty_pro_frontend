import React from 'react';
import { ColumnProps, Order } from './TableShared';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableHead from '@mui/material/TableHead';
import { Box, TableCell, TableRow } from '@mui/material';

type EnhancedTableProps<T> = {
  numSelected?: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: keyof T;
  rowCount: number;
  headCells: Array<ColumnProps<T>>;
};

const EnhancedTableHead = <T extends { id: string | number }>(
  props: EnhancedTableProps<T>
) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
  } = props;
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead sx={{ backgroundColor: '#FFF1E6' }}>
      <TableRow>
        {headCells.map((headCell, index) => {
          return !!headCell.isCheckbox ? (
            <TableCell padding="checkbox" key={`headCell-checkbox-${index}`}>
              <Checkbox
                color="primary"
                indeterminate={
                  !!numSelected && numSelected > 0 && numSelected < rowCount
                }
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
              />
            </TableCell>
          ) : headCell.label ? (
            <TableCell
              key={`headCell-${index}`}
              align={'center'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.key ? order : false}
            >
              <TableSortLabel
                sx={{ fontWeight: 600, fontSize: '14px', left: '18px' }}
                active={orderBy === headCell.key}
                direction={orderBy === headCell.key ? order : 'asc'}
                onClick={createSortHandler(headCell.key)}
              >
                {headCell.label}
                {orderBy === headCell.key ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ) : null;
        })}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
