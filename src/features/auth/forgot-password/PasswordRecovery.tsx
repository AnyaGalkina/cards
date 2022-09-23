import React from "react";
import {useFormik} from "formik";
import {validator} from "../../../common/utils/validator";
import {Navigate} from "react-router-dom";
import {ROUTES} from "../../../common/components/header/nav/Nav";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import {Button, Grid} from "@mui/material";
import FormControl from "@mui/material/FormControl/FormControl";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {AppRootState} from "../../../app/store";
import s from "../../../assets/styles/formContainer.module.css";
import RedirectHelper from "../../../common/components/redirectHelper/RedirectHelper";
import {forgotPasswordTC} from "../auth-reducer";
import {useAppSelector} from "../../../common/hooks/useAppSelector";


export const PasswordRecovery = () => {
    const dispatch = useAppDispatch();
    const isRecoveryPasswordAsked = useAppSelector(state => state.auth.isRecoveryPasswordAsked);

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validate: validator,
        onSubmit: values => {
            dispatch(forgotPasswordTC({email: values.email!}));
            formik.resetForm();
        }
    });

    if (isRecoveryPasswordAsked) {
        return <Navigate to={ROUTES.CHECK_EMAIL}/>
    }

    return (
        <Grid container justifyContent={"center"}>
            <Grid item justifyContent={"center"} className={s.formContainer}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl className={s.formControl}>
                        <h3>Forgot your password?</h3>
                        <FormGroup>
                            <TextField label={"Email"}
                                       margin="normal"
                                       variant="standard"
                                       {...formik.getFieldProps("email")}/>
                            {formik.touched.email && formik.errors.email &&
                                <div className={"error"}>{formik.errors.email}</div>}
                            <p>Enter your email address and we will send you further instructions</p>
                            <Button type={"submit"} variant={"contained"} color={"primary"}>Send instructions</Button>
                        </FormGroup>
                    </FormControl>
                </form>
                <RedirectHelper description={"Did you remember your password?"}
                                path={ROUTES.LOGIN}
                                linkTitle={"Try logging in"}
                />
            </Grid>
        </Grid>
    );
};
