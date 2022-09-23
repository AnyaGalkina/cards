import React, {useCallback, useState} from "react";
import {useFormik} from "formik";
import {Button, Grid, InputAdornment} from "@mui/material";
import {ROUTES} from "../../../common/components/header/nav/Nav";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl/FormControl";
import {validator} from "../../../common/utils/validator";
import {signUpTC} from "./sign-up-reducer";
import {Navigate} from "react-router-dom";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import RedirectHelper from "../../../common/components/RedirectHelper/RedirectHelper";
import s from "../../../assets/style/formContainer.module.css";
import PasswordVisibility from "../../../common/components/PasswordVisibility/PasswordVisibility";
import {useAppSelector} from "../../../common/hooks/useAppSelector";


const SignUp = () => {
    const dispatch = useAppDispatch();
    const isSignedUp = useAppSelector(state => state.signUp.isSignedUp);
    const [passwordType, setPasswordType] = useState("password");

    const toggleShowPassword = useCallback(() => {
        passwordType === "password" ? setPasswordType("text") : setPasswordType("password")
    },[passwordType]);


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
        validate: validator,
        onSubmit: values => {
            if (values.email && values.password) {
                dispatch(signUpTC({email: values.email, password: values.password}));
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
                    <FormControl>
                        <h3>Sing up</h3>
                        <FormGroup className={s.formControl}>
                            <TextField
                                label={"Email"}
                                margin="normal"
                                variant="standard"
                                {...formik.getFieldProps("email")}/>
                            {formik.touched.email && formik.errors.email &&
                                <div className={"error"}>{formik.errors.email}</div>}

                            <TextField
                                type={passwordType}
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

                            <TextField
                                type={passwordType}
                                label={"Confirm password"}
                                margin="normal"
                                variant="standard"
                                {...formik.getFieldProps("confirmPassword")}/>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                                <div className={"error"}>{formik.errors.confirmPassword}</div>}

                            <Button type={"submit"} variant={"contained"} color={"primary"}>Sign Up</Button>
                        </FormGroup>
                    </FormControl>
                </form>

                <RedirectHelper description={"Already have an account"}
                                path={ROUTES.LOGIN}
                                linkTitle={"Sign in"}
                />
            </Grid>
        </Grid>
    );
};

export default SignUp;