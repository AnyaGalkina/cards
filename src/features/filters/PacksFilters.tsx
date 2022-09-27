import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {removeAllFiltersTC, searchByPackName} from "../../common/components/search/filters-reducer";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import * as React from "react";
import {PacksOwnerFilter} from "./packs-owner-filter/PacksOwnerFilter";
import {NumOfCardsFilter} from "./num-of-cards-filter/NumOfCardsFilter";
import {SearchBar} from "../../common/components/search/Search";
import s from "./PacksFilters.module.css";


export const PacksFilters = () => {
    const dispatch = useAppDispatch();

    const onRemoveAllFiltersClickHandler = () => {
        dispatch(removeAllFiltersTC());
        console.log("you set all values to default")
    }

    return (
        <div className={s.mainFilterContainer}>
            <SearchBar setSearchParam={searchByPackName}/>
            <PacksOwnerFilter/>
            <NumOfCardsFilter/>
            <FilterAltOffIcon onClick={onRemoveAllFiltersClickHandler}/>
        </div>
    )
}


export const RemoveAllFilters = () => {
    return (
        <div>
            <FilterAltOffIcon/>
        </div>

    )
}

