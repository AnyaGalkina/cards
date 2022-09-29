import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {Navigate, useParams} from "react-router-dom";
import {ROUTES} from "../../common/enums/enums";
import {getCardsTC} from "./cards-reducer";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {CardsTableComponent} from "./CardsTable/CardsTable";
import UserPreview from "./userPreview/UserPreview";
import CardsHeader from "./CardsHeader/CardsHeader";


const Cards = () => {
    const dispatch = useAppDispatch()
    const {cardsPack_id} = useParams()

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const {cards, cardsTotalCount} = useAppSelector(state => state.cards.cardsState);
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
            <UserPreview/>
            <CardsHeader myProfile={myProfileId === packUserId} cardsPack_id={cardsPack_id} packName={packName}/>
            <CardsTableComponent
                myProfile={myProfileId === packUserId}
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

