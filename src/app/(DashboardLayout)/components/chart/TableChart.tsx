import React from 'react';
import { styled } from '@mui/material/styles';
import {UsePageProps} from "@/app/(DashboardLayout)/finance/usePage";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#FFF1E6",
        color: "#505050",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "#fff",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

interface FiltersProps {
    usePageProps: UsePageProps
}


function createData(
    name: string,
    value: number,
) {
    return { name, value};
}

export const TableChart = ({usePageProps}: FiltersProps) => {

    if (!usePageProps.finances?.data) {
        return null
    }

    const available_unit = usePageProps.finances.data.status.available_unit.qty
    const sold_unit = usePageProps.finances.data.status.sold_unit.qty
    const reserved_unit = usePageProps.finances.data.status.reserved_unit.qty

    const rows = [
        createData('Disponibles', available_unit,),
        createData('Vendidos', sold_unit,),
        createData('Reservados', reserved_unit),
    ];

    return (
       <>
           <TableContainer component={Paper}>
               <Table>
                   <TableHead>
                       <TableRow >
                           <StyledTableCell rowSpan={2} align="center" style={{fontSize:14, fontWeight:'bold'}}>Estatus</StyledTableCell>
                       </TableRow>
                   </TableHead>
                   <TableBody>
                       <Table>
                           <TableBody>
                               {rows.map((row) => (
                                   <StyledTableRow key={row.name}>
                                       <StyledTableCell rowSpan={1} align="center">{row.name}</StyledTableCell>
                                       <StyledTableCell rowSpan={1} align="center">{row.value}</StyledTableCell>
                                   </StyledTableRow>
                               ))}
                           </TableBody>
                       </Table>
                   </TableBody>
               </Table>
           </TableContainer>
       </>
    );
};
