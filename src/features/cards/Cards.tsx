import React from "react";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {Navigate} from "react-router-dom";
import {ROUTES} from "../../common/enums/enums";
import CardsTable from "./CardsTable";

const Cards = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

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
