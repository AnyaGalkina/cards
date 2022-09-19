import React from "react";
import {useSelector} from "react-redux";
import {AppRootState} from "../../../app/store";
import {useFormik} from "formik";
import {LoginRequestType} from "./login-api";
import {loginTC} from "./login-reducer";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

const Login = () => {

    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        } as LoginRequestType,

        validate: (values) => {
            const errors: FormikErrorType = {};

            //Check email value
            if (!values.email) {
                errors.email = "Empty field..."
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            //Check password value
            if (!values.password) {
                errors.password = "Empty field..."
            } else if(values.password.length < 8){
                errors.password = "Password must be more than 7 characters..."
            }

            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        }
    })

    return (
        <div>
            Login
        </div>
    );
};

export default Login;