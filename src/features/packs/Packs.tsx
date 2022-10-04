import React, {useCallback, useEffect, useState} from "react";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {
    addNewPackTC,
    deletePackTC,
    getPacksTC,
    searchByPackName,
    setPage,
    setPageCount,
    updatePacksNameTC
} from "./packs-reducer";
import {PacksFilters} from "../filters/PacksFilters";
import {SearchBar} from "../../common/components/search/Search";
import s from "./Packs.module.css";
import {AddNewPackButton} from "./AddNewPackButton/AddNewPackButton";
import {PacksTable} from "./PacksTable/PacksTable/PacksTable";
import {InfoNotFound} from "../../common/components/info-not-found/InfoNotFound";
import {AddModal} from "../../common/components/modal/AddModal/AddModal";
import {Button} from "@mui/material";

export const Packs = () => {
    const dispatch = useAppDispatch();
    const packs = useAppSelector(state => state.packs.packs);
    const params = useAppSelector(state => state.packs.params);
    const isMyPack = useAppSelector(state => state.packs.params.isMyPack);
    const min = useAppSelector(state => state.packs.params.min);
    const max = useAppSelector(state => state.packs.params.max);
    const pageCount = useAppSelector(state => state.packs.params.pageCount);
    const search = useAppSelector(state => state.packs.params.search);
    const userId = useAppSelector(state => state.packs.params.userId);
    const sortPacks = useAppSelector (state => state.packs.params.sortPacks);
    const status = useAppSelector(state => state.app.status);
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount);

    //need this useState because Pagination starts with 0
    const [page, setPageS] = useState(0);
    const [open, setOpen] = useState(false);
    const openModalHandler = () => setOpen(true);
    const closeModalHandler = () => setOpen(false);

    const changePage = useCallback((event: unknown, newPage: number) => {
        setPageS(newPage);
        dispatch(setPage({page: newPage + 1}))
    }, [dispatch])
    const changeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPageS(0)
        dispatch(setPage({page: 1}))
        dispatch(setPageCount({pageCount: parseInt(event.target.value, 10)}))
    }, [dispatch])

    const addNewPack = useCallback((name: string, isPrivate: boolean) => dispatch(addNewPackTC(name, isPrivate)), [dispatch]);
    const deletePack = useCallback((packId: string) => dispatch(deletePackTC(packId)), [dispatch]);
    const updatePacksName = useCallback((packId: string, name: string) => dispatch(updatePacksNameTC(packId, name)), [dispatch]);

    useEffect(() => {
        dispatch(getPacksTC())
    }, [pageCount, page, search, min, max, isMyPack, sortPacks, maxCardsCount]);

    return (
        <div className={s.tableContainer}>
            <AddNewPackButton
                status={status}
                name={'Add new Pack'}
                openModal={openModalHandler}/>
            <AddModal addPack={addNewPack} open={open} setClose={closeModalHandler}/>
            <div className={s.searchContainer}>
                <SearchBar setSearchParam={searchByPackName}/>
                <PacksFilters/>
            </div>
            { packs.length === 0
                    ? <InfoNotFound itemName={"Packs"} />
                    : <PacksTable
                        userId={userId}
                        rows={packs}
                        page={page}
                        totalCount={params.totalCount}
                        changePage={changePage}
                        rowsPerPage={pageCount}
                        changeRowsPerPage={changeRowsPerPage}
                        deletePack={deletePack}
                        updatePacksName={updatePacksName}
                        sortPacks={sortPacks}
                    />
            }
        </div>
    )
}