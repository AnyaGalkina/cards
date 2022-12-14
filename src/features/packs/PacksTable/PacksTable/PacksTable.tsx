import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import {PacksType} from "../../packsAPI";
import {PacksTableHeader} from "../PacksTableHeader/PacksTableHeader";
import {SortPacksType} from "../../packs-reducer";
import {Pack} from "../Pack/Pack";
import {createPacksData, PackData} from "../../../../common/utils/createData";

//Types
export type Order = 'asc' | 'desc';
type PacksTablePropsType = {
    userId: string
    rows: PacksType[]
    page: number
    totalCount: number
    changePage: (event: unknown, newPage: number) => void
    rowsPerPage: number
    changeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
    deletePack: (packId: string) => void
    updatePacksName: (packId: string, name: string, deckCover: string) => void
    sortPacks: SortPacksType
}


export const  PacksTable = React.memo((props: PacksTablePropsType) => {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof PackData>('name');
    const rows = props.rows.map(row => {
        return createPacksData(row.name, row.cardsCount, row.updated, row.user_name, row._id, '', row.user_id, row.deckCover)
    });

    const requestSortHandler = (event: React.MouseEvent<unknown>, property: keyof PackData,) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return <>
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
                            onRequestSort={requestSortHandler}
                            sortPacks={props.sortPacks}
                        />
                        <TableBody>
                            {rows.map((row) => {
                                return <>
                                    <Pack id={row.id}
                                          name={row.name}
                                          cardsCount={row.cardsCount}
                                          deckCover={row.deckCover}
                                          updated={row.updated}
                                          createdBy={row.createdBy}
                                          userIdFromPack={row.userIdFromPack}
                                          userId={props.userId}
                                          updatePacksName={props.updatePacksName}
                                          deletePack={props.deletePack}/>
                                </>
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
                    onPageChange={props.changePage}
                    onRowsPerPageChange={props.changeRowsPerPage}
                />
            </Paper>
        </Box>
    </>
})
