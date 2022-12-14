import React from 'react';
import {ResCardType} from "../cardsAPI";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import {TableHeader} from "./CardsTableHeader/TableHeader";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {CardsData, createCardsData} from "../../../common/utils/createData";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {deleteCardsTC, updateCardsTC} from "../cards-reducer";
import {Card} from "./Card/Card";

export type Order = 'asc' | 'desc';

type CardsTable = {
    myProfile: boolean
    rows: ResCardType[]
    page: number
    totalCount: number
    handleChangePage: (event: unknown, newPage: number) => void
    rowsPerPage: number
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const CardsTableComponent = (props: CardsTable) => {
    const dispatch = useAppDispatch()

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof CardsData>('question');

    const cards = props.rows.map(card => createCardsData(card.question, card.questionImg, card.answer, card.answerImg, card.updated, card.grade, card._id, card.cardsPack_id!, ''))

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof CardsData,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    const updateCardHandler = (_id: string, cardsPack_id: string, question?: string, answer?: string, questionImg?: string, answerImg?: string ) => {
        dispatch(updateCardsTC({_id, cardsPack_id, question, answer, questionImg, answerImg}))
    }

    const deleteCardHandler = (cardId: string, cardsPack_id: string) => {
        dispatch(deleteCardsTC(cardId, cardsPack_id))
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
                            {cards.map((card) => {
                                return (
                                    <Card card={card}
                                          deleteCardHandler={deleteCardHandler}
                                          updateCardHandler={updateCardHandler}
                                          myProfile={props.myProfile}/>
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