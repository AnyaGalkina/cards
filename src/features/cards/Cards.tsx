import React, {useEffect} from "react";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {Navigate, useParams} from "react-router-dom";
import {ROUTES} from "../../common/enums/enums";
import {getCardsTC, setCardsPage, setCardsPageCount, setSearchCards} from "./cards-reducer";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {CardsTableComponent} from "./CardsTable/CardsTable";
import UserPreview from "./userPreview/UserPreview";
import CardsHeader from "./CardsHeader/CardsHeader";
import {SearchBar} from "../../common/components/search/Search";
import s from "./Cards.module.css";
import {InfoNotFound} from "../../common/components/info-not-found/InfoNotFound";


const Cards = () => {
    const dispatch = useAppDispatch()
    const {cardsPack_id} = useParams()

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const {cards, cardsTotalCount} = useAppSelector(state => state.cards.cardsState);
    const myProfileId = useAppSelector(state => state.profile.user._id)
    const {packUserId, packName} = useAppSelector(state => state.cards.cardsState)
    const {sortCards, search, page, pageCount} = useAppSelector(state => state.cards.params);

    const handleChangePage = (event: unknown, newPage: number) => {
        dispatch(setCardsPage({page: newPage + 1}))
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setCardsPage({page: 1}))
        dispatch(setCardsPageCount({pageCount: parseInt(event.target.value, 10)}))
    };


    useEffect(() => {
        if (cardsPack_id) {
            dispatch(getCardsTC())
        }
    }, [cardsPack_id, search, page, pageCount, sortCards])

    if (!isLoggedIn) {
        return <Navigate to={ROUTES.LOGIN}/>
    }

    return (
        <div className={s.tableContainer}>
            <UserPreview/>
            <CardsHeader myProfile={myProfileId === packUserId} cardsPack_id={cardsPack_id} packName={packName}/>
            <div className={s.searchContainer}>
                <SearchBar setSearchParam={setSearchCards}/>
            </div>
            {cards.length === 0
                ? <InfoNotFound itemName={"Cards"}/>
                : <CardsTableComponent
                    myProfile={myProfileId === packUserId}
                    rows={cards}
                    page={page as number}
                    totalCount={cardsTotalCount}
                    handleChangePage={handleChangePage}
                    rowsPerPage={pageCount as number}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            }
        </div>
    );
};

export default Cards;

