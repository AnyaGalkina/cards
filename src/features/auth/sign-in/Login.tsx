import React from "react";
import {useSelector} from "react-redux";
import {AppRootState} from "../../../app/store";
import {useFormik} from "formik";
import {loginTC} from "./login-reducer";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {Button, Checkbox, FormControlLabel, FormLabel, Grid} from "@mui/material";
import FormControl from "@mui/material/FormControl/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import {validator} from "../../../common/utils/validator";
import Navlink from "../../../common/components/navlink/Navlink";
import {ROUTES} from "../../../common/components/header/nav/Nav";
import {LoginRequestType} from "./login-api";

const Login = () => {

    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        } as LoginRequestType,

        validate: validator,
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm();
        }
    })

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        Sing in
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label={"Email"}
                            margin={'normal'}
                            variant={'standard'}
                            {...formik.getFieldProps('email')}/>
                        {formik.touched.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                        <TextField
                            type="password"
                            label={"Password"}
                            margin={'normal'}
                            variant={'standard'}
                            {...formik.getFieldProps('password')}/>
                        {formik.touched.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox name={'rememberMe'}
                                               onChange={formik.handleChange}
                                               value={formik.values.rememberMe}/>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Sing In
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
            <div>
                <p>Don't have an account?</p>
                <Navlink path={ROUTES.REGISTRATION} title={"Sign Up"}/>
            </div>
        </Grid>
    </Grid>

};

export default Login;