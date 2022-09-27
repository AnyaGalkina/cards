import {Button, ButtonGroup} from "@mui/material";
import * as React from "react";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {setOwner} from "../../../common/components/search/filters-reducer";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import s from "./PacksOwnerFilter.module.css";

export const PacksOwnerFilter = () => {
    const owner = useAppSelector(state => state.filters.owner);
    const dispatch = useAppDispatch();

    const handleOnMeClick = () => {
        dispatch(setOwner({owner: "me"}));
    }

    const handleOnAllClick = () => {
        dispatch(setOwner({owner: "all"}));
    }

    return (
        <div className={s.filterContainer}>
            <span>Show Packs Cards</span>
            <ButtonGroup>
                <Button
                    variant={`${owner === "me" ? "contained" : "text"}`}
                    onClick={handleOnMeClick}
                >Me
                </Button>
                <Button
                    variant={`${owner === "all" ?  "contained" : "text"}`}
                    onClick={handleOnAllClick}
                >All
                </Button>
            </ButtonGroup>
        </div>
    )
}