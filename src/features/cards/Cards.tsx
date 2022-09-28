import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {Navigate, useParams} from "react-router-dom";
import {ROUTES} from "../../common/enums/enums";
import {addCardsTC, getCardsTC} from "./cards-reducer";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {CardsTableComponent} from "./CardsTableComponent";
import {Button, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Create} from "@mui/icons-material";


const Cards = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const {cards, cardsTotalCount} = useAppSelector(state => state.cards.cardsState);
    const {cardsPack_id} = useParams()

    const myProfileId = useAppSelector(state => state.profile.user._id)
    const {packUserId, packName} = useAppSelector(state => state.cards.cardsState)

    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageCount(parseInt(event.target.value, 10));
        setPage(0);
    };

    const addCardHandler = () => {
        if (cardsPack_id) {
            dispatch(addCardsTC({card: {cardsPack_id, question: 'new question', answer: 'new answer'}}))
        }
    }

    useEffect(() => {
        if (cardsPack_id) {
            dispatch(getCardsTC({cardsPack_id, page, pageCount}))
        }
    }, [cardsPack_id, page, pageCount])

    if (!isLoggedIn) {
        return <Navigate to={ROUTES.LOGIN}/>
    }

    return (
        <div>
            {/*avatar profile name*/}
            <Button href={'#/cards/pack'} color={'primary'} startIcon={ <ArrowBackIcon/>}>
                Back to Packs
            </Button>
            <Typography variant="h5" gutterBottom>
                {packName}
            </Typography>
            {/*// search // learn button*/}
            <Button variant={'contained'} color={'primary'} onClick={addCardHandler} endIcon={<Create/>}> {/*dont show when you are friends pack*/}
                new card
            </Button>
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

