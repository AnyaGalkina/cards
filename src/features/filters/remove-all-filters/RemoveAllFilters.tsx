import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {IconButton} from "@mui/material";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import * as React from "react";
import {defaultFilterValues, removeAllFilters} from "../../packs/packs-reducer";

export const RemoveAllFilters = () => {
    const dispatch = useAppDispatch();

    const onRemoveAllFiltersClickHandler = () => {
        dispatch(removeAllFilters(defaultFilterValues));
        console.log("you set all values to default")
    }

    return (
        <div>
            <IconButton onClick={onRemoveAllFiltersClickHandler}>
                <FilterAltOffIcon/>
            </IconButton>
        </div>

    )
}
