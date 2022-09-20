import React from "react";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {AppRootState} from "../../../app/store";
import {useFormik} from "formik";
import {validator} from "../../../common/utils/validator";
import {Navigate, useParams} from "react-router-dom";
import {ROUTES} from "../../../common/components/header/nav/Nav";
import s from "../sign-up/SignUp.module.css";
import Button from "../../../common/components/button/Button";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl/FormControl";
import {setNewPasswordTC} from "../forgot-password/recovery-password-reducer";


const SetPassword = () => {
    const dispatch = useAppDispatch();
    const isSignedUp = useSelector<AppRootState, boolean>(state => state.signUp.isSignedUp);
    // const appError = useSelector<AppRootState, string | null>(state => state.app.error);
    const {token}= useParams();

    const formik = useFormik({
        initialValues: {
            password: "",
        },
        validate: validator,
        onSubmit: values => {
            if(values.password && token) {
                dispatch(setNewPasswordTC({password: values.password, resetPasswordToken: token}));
                console.log(values)
                console.log(token)
                formik.resetForm();
            }
        }
    });

    if (isSignedUp) {
        return <Navigate to={ROUTES.LOGIN}/>
    }

    return (
        <div>
            <h3>Forgot your password?</h3>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormGroup>
                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   variant="standard"
                                   {...formik.getFieldProps("password")}/>
                        {formik.touched.password && formik.errors.password &&
                            <div className={s.error}>{formik.errors.password}</div>}
                        <p>Create new password and we will send you further instructions to email</p>
                        <Button type={"submit"}>Create new password</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </div>
    );
};

export default SetPassword;