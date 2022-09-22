import React from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";

type PropsType = {
    toggleShowPassword: any;
    passwordType: string;
}

const PasswordVisibility = ({passwordType, toggleShowPassword}: PropsType) => {

    return (
        <span onClick={toggleShowPassword}>
             {passwordType === "password" ? <Visibility/> : <VisibilityOff/>}
        </span>
    )
};

export default PasswordVisibility;