import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {Navigate, useParams} from "react-router-dom";
import {ROUTES} from "../../common/enums/enums";
import {getCardsTC, setCardsPage, setCardsPageCount, setSearchCards} from "./cards-reducer";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {CardsTableComponent} from "./CardsTable/CardsTable";
import {CardsHeader} from "./CardsHeader/CardsHeader";
import {SearchBar} from "../../common/components/search/Search";
import s from "./Cards.module.css";
import {InfoNotFound} from "../../common/components/info-not-found/InfoNotFound";
import {Box, Button} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export const Cards = () => {
    const dispatch = useAppDispatch();
    const {cardsPack_id} = useParams();

    const status = useAppSelector(state => state.app.status);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const {cards, cardsTotalCount, packDeckCover} = useAppSelector(state => state.cards.cardsState);
    const myProfileId = useAppSelector(state => state.profile.user._id);
    const {packUserId, packName} = useAppSelector(state => state.cards.cardsState);
    const {sortCards, search, pageCount} = useAppSelector(state => state.cards.params);

    const [page, setPageS] = useState(0);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPageS(newPage);
        dispatch(setCardsPage({page: newPage + 1}))
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageS(0)
        dispatch(setCardsPage({page: 1}))
        dispatch(setCardsPageCount({pageCount: parseInt(event.target.value, 10)}))
    };


    useEffect(() => {
        if (cardsPack_id) {
            dispatch(getCardsTC(cardsPack_id))
        }
    }, [cardsPack_id, search, page, pageCount, sortCards])

    if (!isLoggedIn) {
        return <Navigate to={ROUTES.LOGIN}/>
    }



    return (
        <div  className={s.tableContainer}>
            <div className={s.backButton}>
                <Button href={'#/cards/pack'} color={'primary'} startIcon={ <ArrowBackIcon/>}>
                    Back to Packs
                </Button>
            </div>
            <CardsHeader myProfile={myProfileId === packUserId} cardsPack_id={cardsPack_id!} packName={packName}/>
             <Box
                 sx={{
                     maxHeight: 150,
                     maxWidth: 150,
                     marginLeft: 35,
                     objectFit: 'cover'
                 }}
                 component="img"
                 src={packDeckCover? packDeckCover : ''}
                 alt={'a pack image'}
                 className={s.boxImg}
             />
            <div className={s.searchContainer}>
                <SearchBar setSearchParam={setSearchCards}/>
            </div>
            {status !== "loading" && cards.length === 0
                ? <InfoNotFound itemName={"Cards"}/>
                : <CardsTableComponent
                    myProfile={myProfileId === packUserId}
                    rows={cards}
                    page={page}
                    totalCount={cardsTotalCount}
                    handleChangePage={handleChangePage}
                    rowsPerPage={pageCount as number}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            }
        </div>
    );
};