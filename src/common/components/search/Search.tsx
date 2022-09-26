import * as React from "react";
import {styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {Button} from "@mui/material";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import {removeAllFilters} from "./filters-reducer";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useDebounce} from "../../hooks/useDebounce";
import {ChangeEvent, useEffect, useState} from "react";

const Search = styled("div")(({theme}) => ({
    // position: 'relative',
    position: "absolute",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#FFFFFF",
    color: "#D9D9D9",
    "&:hover": {
        color: "black"
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    textAlign: "left",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "413px",
    },
}));

const SearchIconWrapper = styled("div")(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#D9D9D9",
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

export const SearchBar = () => {
    const dispatch = useAppDispatch();

    const [value, setValue] = useState<string>("");
    const debouncedValue = useDebounce<string>(value, 1500);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    //     // Do fetch here...


    useEffect(() => {
        console.log("debouncedValue ", debouncedValue);
        //     dispatch();
    }, [debouncedValue])

    return (
        <>
            <h3>Search</h3>
            <Search
                // "marginTop":"192px","marginLeft":"136px",
            >
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
        </>
    );
}

//
// {
//
//     box-sizing: border-box;
//
//     position: absolute;
//     left: 0%;
//     right: 0%;
//     top: 0%;
//     bottom: 0%;
//
//     background: #FFFFFF;
//     border: 1px solid #D9D9D9;
//     border-radius: 2px;
//     Width
//     196px
//     Height
//     36px
//     Radius
//     2px
//
//     #D9D9D9
//     #FFFFFF
// }

export const PacksFilters = () => {
    const dispatch = useAppDispatch();

    const onRemoveAllFiltersClickHandler = () => {
        dispatch(removeAllFilters());
        console.log("you set all values to default")
    }

    return (
        <div>
            <h3>Show Packs Cards</h3>
            <Button>Me</Button>
            <Button>All</Button>
            <h3>Number of cards</h3>
            {/*slider*/}
            <FilterAltOffIcon onClick={onRemoveAllFiltersClickHandler}/>
        </div>
    )
}

export const MeAllFilter = () => {

    return (
        <div>
            <Button>Me</Button>
            <Button>All</Button>
        </div>
    )
}

export const RemoveAllFilters = () => {
    return (
        <div>
            <FilterAltOffIcon/>
        </div>

    )
}

