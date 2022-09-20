import React from "react";
import {useFormik} from "formik";
import Button from "../../../common/components/button/Button";
import {ROUTES} from "../../../common/components/header/nav/Nav";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl/FormControl";
import {validator} from "../../../common/utils/validator";
import s from "./SignUp.module.css";
import {useSelector} from "react-redux";
import {signUpTC} from "./sign-up-reducer";
import {Navigate} from "react-router-dom";
import {AppRootState} from "../../../app/store";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import RedirectHelper from "../../../common/components/RedirectHelper/RedirectHelper";


const SignUp = () => {
    const dispatch = useAppDispatch();
    const isSignedUp = useSelector<AppRootState, boolean>(state => state.signUp.isSignedUp);

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
                console.log(values)
                formik.resetForm();
            }
        }
    });

    if (isSignedUp) {
        console.log(isSignedUp, " isSignedUp")
        return <Navigate to={ROUTES.LOGIN}/>
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormGroup>
                        <TextField label={"Email"}
                                   margin="normal"
                                   variant="standard"
                                   {...formik.getFieldProps("email")}/>
                        {formik.touched.email && formik.errors.email &&
                            <div className={s.error}>{formik.errors.email}</div>}

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

                        <Button type={"submit"}>Sign Up</Button>
                    </FormGroup>
                </FormControl>
            </form>

            <RedirectHelper description={"Already have an account"}
                            path={ROUTES.LOGIN}
                            linkTitle={"Sign in"}
            />
        </div>
    );
};

export default SignUp;