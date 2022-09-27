import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {setPage} from "../../search/filters-reducer";
import {IconButton, PaginationItem, Stack} from "@mui/material";
import s from "./Pagination.module.css";

type PropsType = {
    pageCount: number
}


export const Pagination = ({pageCount}: PropsType) => {

    // const page = useAppSelector(state => state.packs.params.page);
    const page = useAppSelector(state => state.filters.page);
    const dispatch = useAppDispatch();

    const pages: number[] = [];
    for (let i = 1; i < (pageCount); i++) {
        pages.push(i);
    }

    const handleArrowBackClick = () => {
        dispatch(setPage({page: page - 1}));
    }

    const handleArrowForwardClick = () => {
        dispatch(setPage({page: page + 1}));
    }

    return (
        // <Stack spacing={2}>
        //     <Pagination
        //         count={10}
        //         renderItem={(item) => (
        //             <PaginationItem
        //                 // components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
        //                 {...item}
        //             />
        //         )}
        //     />
        // </Stack>
        //

        <div className={s.pagination}>
            <IconButton onClick={handleArrowBackClick} disabled={page === 1}>
                <ArrowBackIosIcon/>
            </IconButton>
            {pages.map(p => {
                return (
                    <span
                        className={`${s.page} ${p === page && s.pageActive}`}>{p}
                    </span>
                )
            })}
            <IconButton onClick={handleArrowForwardClick} disabled={page === pages.length}>
                <ArrowForwardIosIcon/>
            </IconButton>
        </div>
    );
};

