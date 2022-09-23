import React, {useCallback, useState} from "react";
import {useFormik} from "formik";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {Button, Checkbox, FormControlLabel, Grid, InputAdornment} from "@mui/material";
import FormControl from "@mui/material/FormControl/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import {validator} from "../../../common/utils/validator";
import {ROUTES} from "../../../common/components/header/nav/Nav";
import {Navigate} from "react-router-dom";
import RedirectHelper from "../../../common/components/redirectHelper/RedirectHelper";
import s from "../../../assets/style/formContainer.module.css"
import {LoginRequestType} from "../authAPI";
import PasswordVisibility from "../../../common/components/passwordVisibility/PasswordVisibility";
import {loginTC, setRecoveryPassword} from "../auth-reducer";
import {useAppSelector} from "../../../common/hooks/useAppSelector";


const Login = () => {

    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const [passwordType, setPasswordType] = useState("password");

    const toggleShowPassword = useCallback(() => {
        passwordType === "password" ? setPasswordType("text") : setPasswordType("password")
    }, [passwordType]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        } as LoginRequestType,

        validate: validator,
        onSubmit: values => {
            dispatch(loginTC(values));
            formik.resetForm();
        }
    });

    if (isLoggedIn) {
        return <Navigate to={ROUTES.PROFILE}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'} className={s.formContainer}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl className={s.formControl}>
                    <h3>Sing In</h3>
                    <FormGroup>
                        <TextField
                            label={"Email"}
                            margin={'normal'}
                            variant={'standard'}
                            {...formik.getFieldProps('email')}/>
                        {formik.touched.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                        <TextField
                            type={passwordType}
                            label={"Password"}
                            margin={'normal'}
                            variant={'standard'}
                            {...formik.getFieldProps('password')}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <PasswordVisibility passwordType={passwordType}
                                                        toggleShowPassword={toggleShowPassword}/>
                                </InputAdornment>
                            }}
                        />
                        {formik.touched.password ?
                            <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox name={'rememberMe'}
                                               onChange={formik.handleChange}
                                               value={formik.values.rememberMe}/>}/>

                        <RedirectHelper path={ROUTES.PASSWORD_RECOVERY}
                                        linkTitle={"Forgot Password?"}
                                        onClickHandler={() => dispatch(setRecoveryPassword({isRecoveryPasswordAsked: false}))}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Sing In
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
            <RedirectHelper description={"Don't have an account?"}
                            path={ROUTES.REGISTRATION}
                            linkTitle={"Sign Up"}
            />
        </Grid>
    </Grid>

};

export default Login;