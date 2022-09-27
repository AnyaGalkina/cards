import React from "react";
import { SearchBar} from "./Search";
import {Button} from "@mui/material";
import axios from "axios";
import {PaginationContainer} from "../pagination/PaginationContainer";
import {PacksFilters} from "../../../features/filters/PacksFilters";
import {searchByPackName} from "./filters-reducer";


export const Test = () => {

    // const onClick = () => {
    //
    // }

    return (
        <div>
            {/*<Button onClick={onClick}>test button</Button>*/}
            {/*<SearchBar setSearchParam={searchByPackName}/>*/}
            <PacksFilters/>
            <PaginationContainer />
        </div>
    );
};