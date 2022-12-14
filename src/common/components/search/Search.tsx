import * as React from "react";
import {ChangeEvent, useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useDebounce} from "../../hooks/useDebounce";
import {SearchIconWrapper, Search, StyledInputBase} from "./SearchStyle";
import s from "../../../features/filters/PacksFilters.module.css";
import {useAppSelector} from "../../hooks/useAppSelector";

type PropsType = {
    setSearchParam: (payload: { search: string }) => void;
}

export const SearchBar = ({setSearchParam}: PropsType) => {
    const appStatus = useAppSelector(state => state.app.status);
    const dispatch = useAppDispatch();

    const [isFirstSearchReq, setIsFirstSearchReq] = useState(false);
    const [value, setValue] = useState<string>("");

    const debouncedValue = useDebounce<string>(value, 1000);

    const onSearchChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setIsFirstSearchReq(true);
        setValue(event.target.value);
    }

    useEffect(() => {
        if (isFirstSearchReq) {
            //@ts-ignore
            dispatch(setSearchParam({search: debouncedValue}));
        }
    }, [debouncedValue])

    return (
        <div className={s.filterContainer}>
            <span>Search</span>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon/>
                </SearchIconWrapper>
                <StyledInputBase
                    disabled={appStatus === "loading"}
                    value={value}
                    onChange={onSearchChangeHandler}
                    placeholder="Provide your text"
                    inputProps={{"aria-label": "search"}}
                />
            </Search>
        </div>
    );
}