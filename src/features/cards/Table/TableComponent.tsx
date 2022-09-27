import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {TableHeader} from "./TableHeader/TableHeader";
import {Rating} from "@mui/material";
import {ResCardType} from "../cardsAPI";
import {RequestPacksType} from "../../packs/packsAPI";

export interface Data {
    question: string;
    answer: string;
    updated: string;
    grade: number;
    // actions: string
}

function createData(
    question: string,
    answer: string,
    updated: string,
    grade: number,
    // actions: string
): Data {
    return {
        question,
        answer,
        updated,
        grade,
        // actions
    };
}



function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

type TableComponent = {
    rows: ResCardType[] | RequestPacksType[]
}

export default function TableComponent(props: TableComponent) {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('question');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const rows = props.rows.map(card => createData(card.question, card.answer, card.updated, card.grade))

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{width: '100%', display:'flex', justifyContent: 'center'}}>
            <Paper sx={{width: '70%'}}>
                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                    >
                        <TableHeader
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {rows.map((row) => {
                                    return (
                                        <TableRow
                                            key={row.question}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {row.question}
                                            </TableCell>
                                            <TableCell align="right">{row.answer}</TableCell>
                                            <TableCell align="right">{row.updated}</TableCell>
                                            <TableCell align="right">
                                                <Rating value={row.grade}/>
                                            </TableCell>
                                            {/*<TableCell>*/}
                                            {/*    {row.actions}*/}
                                            {/*</TableCell>*/}
                                            {/*if my pack add actions* edit delete/*/}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length} //totalCount
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
