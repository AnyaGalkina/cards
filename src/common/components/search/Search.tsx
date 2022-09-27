import * as React from "react";
import {ChangeEvent, useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import {searchByPackName} from "./filters-reducer";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useDebounce} from "../../hooks/useDebounce";
import {SearchIconWrapper, Search, StyledInputBase} from "./SearchStyle";
import s from "../../../features/filters/num-of-cards-filter/NumOfCardsFilter.module.css";

type PropsType = {
    //@ts-ignore
    setSearchParam: ({search: string}) => void;
}

export const SearchBar = ({setSearchParam}: PropsType) => {
    const dispatch = useAppDispatch();

    const [value, setValue] = useState<string>("");
    const debouncedValue = useDebounce<string>(value, 1000);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    useEffect(() => {
        // dispatch(searchByPackName({search: debouncedValue}));
        //@ts-ignore
        dispatch(setSearchParam({search: debouncedValue}));
    }, [debouncedValue])

    return (
        <div className={s.filterContainer}>
            <span>Search</span>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon/>
                </SearchIconWrapper>
                <StyledInputBase
                    value={value}
                    onChange={handleSearchChange}
                    placeholder="Provide your text"
                    inputProps={{"aria-label": "search"}}
                />
            </Search>
        </div>
    );
}