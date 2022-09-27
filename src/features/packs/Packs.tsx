import React, {useCallback, useEffect, useState} from "react";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {PacksTableComponent}from "./PacksTableComponent";
import {getPacksTC, searchByPackName} from "./packs-reducer";
import {PacksFilters} from "../filters/PacksFilters";
import {SearchBar} from "../../common/components/search/Search";
import s from "./Packs.module.css";

export const Packs = () => {
    const dispatch = useAppDispatch();
    const packs = useAppSelector(state => state.packs.packs);
    const params = useAppSelector(state => state.packs.params);
    const isMyPack = useAppSelector(state => state.packs.params.isMyPack);
    const min = useAppSelector(state => state.packs.params.min);
    const max = useAppSelector(state => state.packs.params.max);
    const search = useAppSelector(state => state.packs.params.search);

    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageCount(parseInt(event.target.value, 10));
        setPage(0)
    };

    useEffect(() => {
        // dispatch(getPacksTC(page + 1, pageCount, params.userId))
        dispatch(getPacksTC());
    }, [pageCount, page, search, min, max, isMyPack]);


    return (
        <div>
            <div className={s.mainFilterContainer}>
                <SearchBar setSearchParam={searchByPackName}/>
                <PacksFilters/>
            </div>
            <PacksTableComponent
                rows={packs}
                page={page}
                totalCount={params.totalCount}
                handleChangePage={handleChangePage}
                rowsPerPage={pageCount}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    )
}