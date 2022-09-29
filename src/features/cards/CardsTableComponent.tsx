import React from 'react';
import {ResCardType} from "./cardsAPI";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import {TableHeader} from "./TableHeader";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Rating} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import {SortCardsType} from "./cards-reducer";


export interface CardsData {
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
): CardsData {
    return {
        question,
        answer,
        updated,
        grade,
        // actions
    };
}

export type Order = 'asc' | 'desc';

type CardsTableComponent = {
    rows: ResCardType[]
    page: number
    totalCount: number
    handleChangePage: (event: unknown, newPage: number) => void
    rowsPerPage: number
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const CardsTableComponent = (props: CardsTableComponent) => {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof CardsData>('question');

    // const [page, setPage] = React.useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const rows = props.rows.map(card => createData(card.question, card.answer, card.updated, card.grade))

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof CardsData,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    return (
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
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
                    count={props.totalCount}
                    rowsPerPage={props.rowsPerPage}
                    page={props.page}
                    onPageChange={props.handleChangePage}
                    onRowsPerPageChange={props.handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}