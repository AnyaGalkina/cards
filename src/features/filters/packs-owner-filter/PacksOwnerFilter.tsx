import {Button, ButtonGroup} from "@mui/material";
import * as React from "react";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import s from "../PacksFilters.module.css";
import {setOwner} from "../../packs/packs-reducer";

export const PacksOwnerFilter = () => {
    const isMyPack = useAppSelector(state => state.packs.params.isMyPack);
    const appStatus= useAppSelector(state => state.app.status);
    const dispatch = useAppDispatch();

    const handleOnMeClick = () => {
        dispatch(setOwner({isMyPack: true}));
    }

    const handleOnAllClick = () => {
        dispatch(setOwner({isMyPack: false}));
    }

    return (
        <div className={s.filterContainer}>
            <span>Show Packs Cards</span>
            <ButtonGroup>
                <Button
                    disabled={appStatus === "loading"}
                    variant={`${isMyPack ? "contained" : "text"}`}
                    onClick={handleOnMeClick}
                >Me
                </Button>
                <Button
                    disabled={appStatus === "loading"}
                    variant={`${!isMyPack ?  "contained" : "text"}`}
                    onClick={handleOnAllClick}
                >All
                </Button>
            </ButtonGroup>
        </div>
    )
}