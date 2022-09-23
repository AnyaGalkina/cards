import React, {useCallback, useState} from "react";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {useFormik} from "formik";
import {validator} from "../../../common/utils/validator";
import {Navigate, useParams} from "react-router-dom";
import {ROUTES} from "../../../common/components/header/nav/Nav";
import {Button, Grid, InputAdornment} from "@mui/material";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl/FormControl";
import {setNewPasswordTC} from "../forgot-password/recovery-password-reducer";
import s from "../sign-in/formContainer.module.css";
import PasswordVisibility from "../../../common/components/PasswordVisibility/PasswordVisibility";
import {useAppSelector} from "../../../common/hooks/useAppSelector";


const SetPassword = () => {
    const dispatch = useAppDispatch();
    const isSignedUp = useAppSelector(state => state.signUp.isSignedUp);
    const {token} = useParams();
    const [passwordType, setPasswordType] = useState("password");

    const toggleShowPassword = useCallback(() => {
        passwordType === "password" ? setPasswordType("text") : setPasswordType("password")
    },[passwordType]);

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validate: validator,
        onSubmit: values => {
            if (values.password && token) {
                dispatch(setNewPasswordTC({password: values.password, resetPasswordToken: token}));
                formik.resetForm();
            }
        }
    });

    if (isSignedUp) {
        return <Navigate to={ROUTES.LOGIN}/>
    }

    return (
        <Grid container justifyContent={"center"}>
            <Grid item justifyContent={"center"} className={s.formContainer}>

                <form onSubmit={formik.handleSubmit}>
                    <FormControl className={s.formControl}>
                        <h3>Create new password</h3>
                        <FormGroup>
                            <TextField type={passwordType}
                                       label="Password"
                                       margin="normal"
                                       variant="standard"
                                       {...formik.getFieldProps("password")}
                                       InputProps={{
                                           endAdornment: <InputAdornment position="end">
                                               <PasswordVisibility  passwordType={passwordType}  toggleShowPassword={toggleShowPassword}/>
                                           </InputAdornment>}}
                            />

                            {formik.touched.password && formik.errors.password &&
                                <div className={"error"}>{formik.errors.password}</div>}

                            <TextField type={passwordType}
                                       label={"Confirm password"}
                                       margin="normal"
                                       variant="standard"
                                       {...formik.getFieldProps("confirmPassword")}/>

                            {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                                <div className={"error"}>{formik.errors.confirmPassword}</div>}

                            <p>Create new password and we will send you further instructions to email</p>
                            <Button type={"submit"} variant={"contained"} color={"primary"}>Create new password</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>

    );
};

export default SetPassword;