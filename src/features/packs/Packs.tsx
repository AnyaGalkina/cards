import React, {useEffect, useState} from "react";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {getPacksTC, searchByPackName, setPage, setPageCount} from "./packs-reducer";
import {PacksFilters} from "../filters/PacksFilters";
import {SearchBar} from "../../common/components/search/Search";
import s from "./Packs.module.css";
import PacksTableComponent from "./PacksTableComponent";

export const Packs = () => {
    const dispatch = useAppDispatch();
    const packs = useAppSelector(state => state.packs.packs);
    const params = useAppSelector(state => state.packs.params);
    const isMyPack = useAppSelector(state => state.packs.params.isMyPack);
    const min = useAppSelector(state => state.packs.params.min);
    const max = useAppSelector(state => state.packs.params.max);
    const pageCount = useAppSelector(state => state.packs.params.pageCount);
    const search = useAppSelector(state => state.packs.params.search);
    const sortPacks = useAppSelector (state => state.packs.params.sortPacks);

    //need this useState because Pagination starts with 0
    const [page, setPageS] = useState(0);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPageS(newPage);
        dispatch(setPage({page: newPage+1}))
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageS(0)
        dispatch(setPage({page: 1}))
        dispatch(setPageCount({pageCount: parseInt(event.target.value, 10)}))
    };

    useEffect(() => {
        dispatch(getPacksTC())
    }, [pageCount, page, search, min, max, isMyPack, sortPacks]);


    return (
        <div className={s.packContainer}>
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