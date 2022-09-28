import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {IconButton} from "@mui/material";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import * as React from "react";
import {defaultFilterValues, removeAllFilters} from "../../packs/packs-reducer";
import s from "./RemoveAllFilters.module.css";

export const RemoveAllFilters = () => {
    const dispatch = useAppDispatch();

    const onRemoveAllFiltersClickHandler = () => {
        dispatch(removeAllFilters(defaultFilterValues));
    }

    return (
        <div className={s.clearFiltersContainer}>
            <IconButton onClick={onRemoveAllFiltersClickHandler}>
                <FilterAltOffIcon/>
            </IconButton>
        </div>

    )
}
