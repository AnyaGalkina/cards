import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {PacksType} from "../packsAPI";
import {PacksTableHeader} from "./PacksTableHeader";
import {useNavigate} from "react-router-dom";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

export interface Data {
    name: string;
    cardsCount: number;
    updated: string;
    createdBy: string;
    actions: string;
    id: string;
    userIdFromPack: string
}

function createData(
    name: string,
    cardsCount: number,
    updated: string,
    createdBy: string,
    actions: string,
    id: string,
    userIdFromPack: string
): Data {
    return {
        name,
        cardsCount,
        updated,
        createdBy,
        actions,
        id,
        userIdFromPack
    };
}

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }

export type Order = 'asc' | 'desc';

// function getComparator<Key extends keyof any>(
//     order: Order,
//     orderBy: Key,
// ): (
//     a: { [key in Key]: number | string },
//     b: { [key in Key]: number | string },
// ) => number {
//     return order === 'desc'
//         ? (a, b) => descendingComparator(a, b, orderBy)
//         : (a, b) => -descendingComparator(a, b, orderBy);
// }

type PacksTableComponent = {
    userId: string
    rows: PacksType[]
    page: number
    totalCount: number
    handleChangePage: (event: unknown, newPage: number) => void
    rowsPerPage: number
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
    deletePack: (packId: string) => void
}

export default function PacksTableComponent(props: PacksTableComponent) {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
    const rows = props.rows.map(row => {
        return createData(row.name, row.cardsCount, row.updated, row.user_name, '', row._id, row.user_id)
    });

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data,) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const navigate = useNavigate()

    const onClickHandler = (id: string) => {
        navigate(`/cards/card/${id}`)
    }

    return (
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', margin: 5}}>
            <Paper sx={{width: '70%', mb: 2}}>
                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                    >
                        <PacksTableHeader
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {
                                rows.map((row) => {
                                    return (
                                        <TableRow
                                            key={row.id}
                                        >
                                            <TableCell
                                                align="left"
                                                component="th"
                                                scope="row"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="left">{row.cardsCount}</TableCell>
                                            <TableCell align="left">{row.updated}</TableCell>
                                            <TableCell align="left">{row.createdBy}</TableCell>
                                            <TableCell align="left">
                                                <MenuOutlinedIcon
                                                    onClick={() => {onClickHandler(row.id)}}/>
                                                {row.userIdFromPack === props.userId
                                                    ? <DeleteOutlinedIcon
                                                        onClick={() => {
                                                            props.deletePack(row.id)
                                                        }}/>
                                                    : null}
                                            </TableCell>
                                            {/*if my pack add actions* edit delete/*/}
                                        </TableRow>
                                    );
                                })
                            }
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
