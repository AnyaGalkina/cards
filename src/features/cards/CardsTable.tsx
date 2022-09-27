import React from 'react';
import TableComponent from "./Table/TableComponent";
import {useAppSelector} from "../../common/hooks/useAppSelector";


const CardsTable = () => {

    const cards = useAppSelector(state => state.cards.cardsState.cards)

    return (
        <TableComponent rows={cards} />
    );
};

export default CardsTable;