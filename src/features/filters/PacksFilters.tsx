import * as React from "react";
import {PacksOwnerFilter} from "./packs-owner-filter/PacksOwnerFilter";
import {NumOfCardsFilter} from "./num-of-cards-filter/NumOfCardsFilter";
import {RemoveAllFilters} from "./remove-all-filters/RemoveAllFilters";


export const PacksFilters = () => {

    return (
        <>
            <PacksOwnerFilter/>
            <NumOfCardsFilter/>
            <RemoveAllFilters/>
        </>
    )
}
