import React, {useEffect} from "react";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {Navigate} from "react-router-dom";
import {ROUTES} from "../../common/enums/enums";
import CardsTable from "./CardsTable";
import {getCardsTC} from "./cards-reducer";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";

const Cards = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCardsTC({cardsPack_id: '6331681abe4fc2000449a1b9'}))
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={ROUTES.LOGIN}/>
    }

    return (
        // name and avatar user.name user.avatar
        // back to pack list Navlink
        // my or frined's pack name
        // search // learn button | add new card
        <CardsTable/>
    );
};

export default Cards;
