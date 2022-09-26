import React, {useEffect} from "react";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {getPacksTC} from "./packs-reducer";

export const Packs = () => {
    const dispatch = useAppDispatch();
    const selector = useAppSelector(state => state.packs);

    useEffect(() => {
        dispatch(getPacksTC(1, 5, selector.params.userId))
    }, [])


    return (
        <div>
            <li>
                {selector.packs.map(e => e.name)}
            </li>
        </div>
    )
}