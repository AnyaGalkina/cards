import React from "react";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {AppRootState} from "../../../app/store";
import {useFormik} from "formik";
import {validator} from "../../../common/utils/validator";
import {Navigate, useParams} from "react-router-dom";
import {ROUTES} from "../../../common/components/header/nav/Nav";
import s from "../sign-up/SignUp.module.css";
import {Button} from "@mui/material";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl/FormControl";
import {setNewPasswordTC} from "../forgot-password/recovery-password-reducer";


const SetPassword = () => {
    const dispatch = useAppDispatch();
    const isSignedUp = useSelector<AppRootState, boolean>(state => state.signUp.isSignedUp);
    const {token}= useParams();

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
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
            <h3>Create new password</h3>
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

                        <TextField type="password"
                                   label={"Confirm password"}
                                   margin="normal"
                                   variant="standard"
                                   {...formik.getFieldProps("confirmPassword")}/>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                            <div className={s.error}>{formik.errors.confirmPassword}</div>}

                        <p>Create new password and we will send you further instructions to email</p>
                        <Button type={"submit"}  variant={'contained'} color={'primary'}>Create new password</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </div>
    );
};

export default SetPassword;