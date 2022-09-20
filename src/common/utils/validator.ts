export type ValuesType = {
    email?: string,
    password?: string;
    rememberMe?: boolean;
    confirmPassword?: string;
}

type FormikErrorType = {
    email?: string,
    password?: string;
    confirmPassword?: string;
}

export const validator = (values: ValuesType):  FormikErrorType => {
    const errors: FormikErrorType = {}

    if (!values.email) {
        errors.email = "Field is required";
    } else if (values.email &&  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }

    if(!values.password) {
        errors.password = "Field is required";
    } else if (values.password && values.password.length < 8) {
        errors.password = "Password should be minimum 8 symbols";
    }

    if(values.confirmPassword === "") {
        errors.confirmPassword = "Field is required";
    }else if(values.confirmPassword && values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords are not equal";
    }

    return errors
};
