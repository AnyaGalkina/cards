import React from "react";
import {useAppSelector} from "../../hooks/useAppSelector";
import {InputLabel, MenuItem, Select, SelectChangeEvent, TablePagination} from "@mui/material";
import FormControl from "@mui/material/FormControl/FormControl";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {Pagination} from "./pagination/Pagination";
import {setPageCount} from "../search/filters-reducer";

export const PaginationContainer = () => {
    // const pageCount = useAppSelector(state => state.packs.params.pageCount);
    const pageCount = useAppSelector(state => state.filters.pageCount);
    const dispatch = useAppDispatch();

    const handlePageCountChange = (event: SelectChangeEvent) => {
        // console.log(pageCount)
        dispatch(setPageCount({pageCount: +event.target.value}));
    }

    return (
        <div>
            <Pagination pageCount={pageCount}/>

            <span>Show</span>

            {/*<TablePagination*/}
            {/*    component="div"*/}
            {/*    count={100}*/}
            {/*    page={page}*/}
            {/*    onPageChange={handleChangePage}*/}
            {/*    rowsPerPage={rowsPerPage}*/}
            {/*    onRowsPerPageChange={handleChangeRowsPerPage}*/}
            {/*/>*/}

            <FormControl style={{"width": "60px", "height": "15px", "fontSize": "12px"}}>
                <InputLabel id="page-count-select-label">{pageCount}</InputLabel>
                <Select
                    labelId="page-count-select-label"
                    id="page-count-select-label"
                    value={pageCount.toString()}
                    inputProps={{ 'aria-label': 'Without label' }}
                    onChange={handlePageCountChange}
                >
                    <MenuItem value={10} autoFocus>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                </Select>
            </FormControl>


            <span>Cards per Page</span>
        </div>
    );
};