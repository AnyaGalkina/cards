import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {IconButton} from "@mui/material";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import * as React from "react";
import {defaultFilterValues, removeAllFilters} from "../../packs/packs-reducer";
import s from "./RemoveAllFilters.module.css";
import {useAppSelector} from "../../../common/hooks/useAppSelector";

export const RemoveAllFilters = () => {
    const appStatus= useAppSelector(state => state.app.status);
    const dispatch = useAppDispatch();

    const onRemoveAllFiltersClickHandler = () => {
        dispatch(removeAllFilters(defaultFilterValues));
    }

    return (
        <div className={s.clearFiltersContainer}>
            <IconButton onClick={onRemoveAllFiltersClickHandler}  disabled={appStatus === "loading"}>
                <FilterAltOffIcon/>
            </IconButton>
        </div>

    )
}
