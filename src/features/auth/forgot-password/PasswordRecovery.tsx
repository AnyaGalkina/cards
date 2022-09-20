import React from "react";
import {useFormik} from "formik";
import {validator} from "../../../common/utils/validator";
import {Navigate} from "react-router-dom";
import {ROUTES} from "../../../common/components/header/nav/Nav";
import s from "../sign-up/SignUp.module.css";
import Button from "../../../common/components/button/Button";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl/FormControl";
import RedirectHelper from "../../../common/components/RedirectHelper/RedirectHelper";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {forgotPasswordTC} from "./recovery-password-reducer";
import {useSelector} from "react-redux";
import {AppRootState} from "../../../app/store";


const PasswordRecovery = () => {
    const dispatch = useAppDispatch();
    const isRecoveryPasswordAsked = useSelector<AppRootState, boolean>(state => state.recoveryPassword.isRecoveryPasswordAsked);

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validate: validator,
        onSubmit: values => {
            dispatch(forgotPasswordTC({email: values.email!}));
            console.log(values);
            formik.resetForm();
        }
    });

    if (isRecoveryPasswordAsked) {
        return <Navigate to={ROUTES.CHECK_EMAIL}/>
    }

    return (
        <div>
            <h3>Forgot your password?</h3>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormGroup>
                        <TextField label={"Email"}
                                   margin="normal"
                                   variant="standard"
                                   {...formik.getFieldProps("email")}/>
                        {formik.touched.email && formik.errors.email &&
                            <div className={s.error}>{formik.errors.email}</div>}
                        <p>Enter your email address and we will send you further instructions</p>
                        <Button type={"submit"}>Send instructions</Button>
                    </FormGroup>
                </FormControl>
            </form>
            <RedirectHelper description={"Did you remember your password?"}
                            path={ROUTES.LOGIN}
                            linkTitle={"Try logging in"}
            />
        </div>
    );
};


export default PasswordRecovery;