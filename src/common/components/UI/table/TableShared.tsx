import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import EnhancedTableHead from './EnhancedTableHead';

function extractNumber(value: string): number {
  // Eliminar símbolos de moneda y otros caracteres no numéricos
  const sanitizedValue = value.replace(/[^0-9.-]/g, '');
  // Extraer el primer número encontrado en una cadena
  const match = sanitizedValue.match(/-?\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : NaN;
}

// Helper function to get the string representation of a value
function getComparableValue(value: any): string {
  if (typeof value === 'object' && value !== null) {
    // Assume that the object has a property named 'value' to compare
    return value['name'] !== undefined ? String(value['name']) : '';
  }

  return String(value);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  // Extract the values based on the property key
  const aValue = a[orderBy];
  const bValue = b[orderBy];

  const aComparableValue = getComparableValue(aValue);
  const bComparableValue = getComparableValue(bValue);

  // Extract numbers from the comparable values
  const aNumber = extractNumber(aComparableValue);
  const bNumber = extractNumber(bComparableValue);

  // Compare numerically if both are numbers
  if (!isNaN(aNumber) && !isNaN(bNumber)) {
    return bNumber - aNumber;
  }

  // Compare lexicographically if neither is a number
  if (isNaN(aNumber) && isNaN(bNumber)) {
    return bComparableValue.localeCompare(aComparableValue);
  }

  // If one value is numeric and the other is not
  return isNaN(aNumber) ? 1 : -1;
}

export type Order = 'asc' | 'desc';

function getComparator<T, Key extends keyof T>(
  order: Order,
  orderBy: Key
): (a: T, b: T) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: T[], comparator: (a: T, b: T) => number): T[] {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export interface ColumnProps<T> {
  disablePadding: boolean;
  key: keyof T;
  label: string | React.ReactElement;
  isCheckbox?: boolean;
  numeric: boolean;
  render?: (
    column: ColumnProps<T>,
    item: T,
    isItemSelected: boolean,
    handleClick?: (event: React.MouseEvent<unknown>, item: T) => void
  ) => React.ReactElement | string | number;
}

export type TableSharedProps<T> = {
  rows: T[];
  headCells: Array<ColumnProps<T>>;
  orderByValue: keyof T;
  rowsPerPage: { value: number; label: string };
  changePageSize: (size: number) => void;
  page: number;
  count?: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  headTitle: string;
  multiSelectActions?: React.ReactElement;
  selected?: readonly T[];
  setSelected?: React.Dispatch<React.SetStateAction<readonly T[]>>;
  onClickRow?: (record: T) => void;
};

const TableShared = <T extends { id: string | number }>({
  headCells,
  rows,
  count,
  orderByValue,
  rowsPerPage,
  changePageSize,
  page,
  setPage,
  headTitle,
  multiSelectActions,
  selected,
  setSelected,
  onClickRow,
}: TableSharedProps<T>) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof T>(orderByValue);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected?.(rows);
      return;
    }
    setSelected?.([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, item: T) => {
    if (!selected) {
      return;
    }
    const selectedIndex = selected.map((s) => s.id).indexOf(item.id);
    let newSelected: readonly T[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, item);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected?.(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    changePageSize(parseInt(event.target.value));
    setPage(0);
  };

  const isSelected = (item: T) =>
    selected ? selected.map((s) => s.id).indexOf(item.id) !== -1 : false;

  // Avoid a layout jump when reaching the last page with empty rows.
  const visibleRows = React.useMemo(
    () => stableSort<T>(rows, getComparator(order, orderBy)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rows, order, orderBy, page, rowsPerPage, headCells]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        sx={{
          borderRadius: '8px',
          border: '1px solid #E7E7E7',
          width: '100%',
          mb: 2,
          boxShadow: '0px 1px 4px 0px #E7E7E7',
        }}
      >
        <EnhancedTableToolbar
          numSelected={selected?.length}
          headTitle={headTitle}
          multiSelectActions={multiSelectActions}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead<T>
              numSelected={selected?.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row);
                const labelId = `enhanced-table-checkbox`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={`row-checkbox-${index}`}
                    selected={isItemSelected}
                    onClick={() => onClickRow?.(row)}
                    sx={{
                      cursor: onClickRow ? 'pointer' : 'auto',
                      height: '40.9px',
                    }}
                  >
                    {headCells.map((cell, index2) => {
                      const value = cell.render
                        ? cell.render(
                            cell,
                            row as T,
                            isItemSelected,
                            handleClick
                          )
                        : (row[cell.key as keyof typeof row] as string);
                      return value ? (
                        <TableCell
                          key={`table-cell-${index2}`}
                          sx={{
                            borderLeft: '1px solid #E7E7E7',
                            fontSize: '14px',
                          }}
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          {value}
                        </TableCell>
                      ) : null;
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[
            { label: '50', value: 50 },
            { label: '100', value: 100 },
            { label: '200', value: 200 },
            { label: 'Todos', value: -1 },
          ]}
          component="div"
          count={count ?? rows.length}
          labelDisplayedRows={({ from, to, count }) => {
            return `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`;
          }}
          labelRowsPerPage={'Filas por página:'}
          rowsPerPage={rowsPerPage.value}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
export default TableShared;
