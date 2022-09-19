import React from "react";
import {useFormik} from "formik";
import Button from "../../../common/components/button/Button";
import {ROUTES} from "../../../common/components/header/nav/Nav";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl/FormControl";
import {Navigate} from "react-router-dom";
import Navlink from "../../../common/components/navlink/Navlink";


const SignUp = () => {

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },

        onSubmit: values => {
            //При успешной регистрации
            // - редирект на логин
            alert({...values});
            formik.resetForm();
        }
    });


    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormGroup>
                        <TextField label={"Email"} margin="normal" variant="standard"
                                   {...formik.getFieldProps("email")}/>
                        <TextField type="password" label="Password" margin="normal" variant="standard"
                                   {...formik.getFieldProps("password")}/>
                        <TextField type="password" label={"Confirm password"} margin="normal"variant="standard"
                                   {...formik.getFieldProps("confirmPassword")}/>
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