import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {Navigate, useParams} from "react-router-dom";
import {ROUTES} from "../../common/enums/enums";
import {getCardsTC} from "./cards-reducer";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {CardsTableComponent} from "./CardsTableComponent";
import {Button} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Cards = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    // const {cardsPack_id, cardQuestion, cardAnswer, sortCards,
    //     // page, pageCount
    // } = useAppSelector(state => state.cards.params);
    const {cards, cardsTotalCount} = useAppSelector(state => state.cards.cardsState);
    const {cardsPack_id} = useParams()

    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageCount(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        if (cardsPack_id) {
            dispatch(getCardsTC({cardsPack_id}))
        }
    }, [cardsPack_id])

    if (!isLoggedIn) {
        return <Navigate to={ROUTES.LOGIN}/>
    }

    return (
        <div>
            <Button href={'/cards/pack'} color={'primary'} startIcon={ <ArrowBackIcon />}>
                Back to Packs
            </Button>
            {/*// my or frined's pack name*/}
            {/*// search // learn button | add new card*/}
            <CardsTableComponent
                rows={cards}
                page={page}
                totalCount={cardsTotalCount}
                handleChangePage={handleChangePage}
                rowsPerPage={pageCount}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default Cards;

