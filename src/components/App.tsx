import * as React from "react";
import { withFormik, FormikProps } from "formik";
import * as Yup from "yup";

import Wrapper from "../styles/Wrapper";
import InputWrapper from "../styles/InputWrapper";
import Input from "../styles/Input";
import Label from "../styles/Label";

interface FormValues {
    email: string;
    password: string;
}

interface OtherProps {
    title?: string;
}

interface MyFormProps {
    initialEmail?: string;
    initialPassword?: string;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        title
    } = props;

    return (
        <Wrapper>
            <h1>{title}</h1>
            <form onSubmit={handleSubmit}>
                <InputWrapper>
                    <Label>Email</Label>
                    <Input
                        width={50}
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                </InputWrapper>

                <InputWrapper>
                    <Label>Password</Label>
                    <Input
                        width={50}
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                </InputWrapper>

                <button
                    type="submit"
                    disabled={
                        isSubmitting ||
                        !!(errors.email && touched.email) ||
                        !!(errors.password && touched.password)
                    }
                >
                    Sign In
                </button>
            </form>
        </Wrapper>
    );
};

const App = withFormik<MyFormProps, FormValues>({
    mapPropsToValues: props => ({
        email: props.initialEmail || "",
        password: props.initialPassword || ""
    }),

    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email("Email not valid")
            .required("Email is required"),
        password: Yup.string().required("Password is required")
    }),

    handleSubmit(
        { email, password }: FormValues,
        { props, setSubmitting, setErrors }
    ) {
        console.log(email, password);
    }
})(InnerForm);

export default App;
