import React from "react";
import {useFormik} from "formik";
import Button from "../../../common/components/button/Button";
import {ROUTES} from "../../../common/components/header/nav/Nav";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl/FormControl";
import Navlink from "../../../common/components/navlink/Navlink";
import {validator} from "../../../common/utils/validator";
import s from "./SignUp.module.css";

const SignUp = () => {

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
        validate: validator,
        onSubmit: values => {
            //При успешной регистрации// - редирект на логин
            console.log(values)
            formik.resetForm();
        }
    });

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
            <div>
                <p>Already have an account</p>
                <Navlink path={ROUTES.LOGIN} title={"Sign in"}/>
            </div>
        </div>
    );
};

export default SignUp;