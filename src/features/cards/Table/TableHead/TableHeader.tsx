import {TableCell, tableCellClasses, TableHead, TableRow, TableSortLabel} from '@mui/material';
import {styled} from '@mui/material/styles';
import React from 'react';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.main),
        border: 1
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        fontWeight: 'bold',
    },
}));

const TableHeader = () => {
    return (
        <TableHead>
            <TableRow>
                <StyledTableCell>Question</StyledTableCell>
                <StyledTableCell>Answer</StyledTableCell>
                <StyledTableCell>
                        <TableSortLabel>
                         Last Updated
                        </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>Grade</StyledTableCell>
            </TableRow>
        </TableHead>
    );
};

export default TableHeader;