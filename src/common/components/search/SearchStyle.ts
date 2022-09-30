import {styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export const Search = styled("div")(({theme}) => ({
    position: "relative",
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
    display:"flex",
    flexDirection: "row"
}));

export const SearchIconWrapper = styled("div")(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30px",
}));

export const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));
