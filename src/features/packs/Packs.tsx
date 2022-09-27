import React, {useEffect} from "react";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {getPacksTC, searchByPackName} from "./packs-reducer";
import {PacksFilters} from "../filters/PacksFilters";
import {SearchBar} from "../../common/components/search/Search";
import s from "./Packs.module.css";

export const Packs = () => {
    const dispatch = useAppDispatch();
    const selector = useAppSelector(state => state.packs);
    const params = useAppSelector(state => state.packs.params);
    const isMyPack = useAppSelector(state => state.packs.params.isMyPack);
    const min = useAppSelector(state => state.packs.params.min);
    const max = useAppSelector(state => state.packs.params.max);
    const search = useAppSelector(state => state.packs.params.search);
    const pageCount = useAppSelector(state => state.packs.params.pageCount);
    const page = useAppSelector(state => state.packs.params.page);


    useEffect(() => {
        dispatch(getPacksTC(1, 5, selector.params.userId))
    }, [])

    useEffect(() => {
        debugger
        // dispatch(getPacksTC());
        console.log({...params})
    }, [pageCount, page, search, min, max, isMyPack]);

    return (
        <div>
            <div className={s.mainFilterContainer}>
                <SearchBar setSearchParam={searchByPackName}/>
                <PacksFilters/>
            </div>
            <li>
                {selector.packs.map(e => e.name)}
            </li>
        </div>
    )
}