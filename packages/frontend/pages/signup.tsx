import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { useStore } from '../app/store';

import * as Yup from 'yup';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';

// Shape of form values
interface FormValues {
    username: string;
    email: string;
    password: string;
}

interface OtherProps {
    title: string;
    message: string;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const { touched, errors, isSubmitting, message, title } = props;

    return (
        <div className="w-full max-w-lg pt-[48px] m-auto">
            <div className="pb-12">
                <h1 className="text-3xl pb-1">{title}</h1>
                <h3 className="text-lg">{message}</h3>
            </div>
            <Form className="bg-white pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <div className="flex">
                        <div className="bg-[#F5F6F8] mb-3 pl-[16px] pr-[2px] py-[4px] items-center rounded-l">
                            <div className="text-[14px] font-[700] leading-[1.5] pt-[3px]">
                                lunktwig.com/
                            </div>
                        </div>
                        <Field
                            className={(errors.username ? "border-red-500 " : "" ) + "appearance-none w-full rounded-r py-2 pr-3 pl-[1px] text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-[#F5F6F8]"}
                            id="username" type="text" name="username" placeholder="Username" />
                    </div>
                    {touched.username && errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Email
                    </label>
                    <Field
                        className={(errors.email ? "border-red-500 " : "" ) + "appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-[#F5F6F8]"}
                        id="email" type="email" name="email" placeholder="Email" />
                    {touched.email && errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <Field
                        className={(errors.password ? "border-red-500 " : "" ) + "appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-[#F5F6F8]"}
                        id="password" type="password" name="password" />
                    {touched.password && errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    type="submit" disabled={isSubmitting}>
                    Sign up with email
                </button>
            </Form>
            <p className="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
            </p>
        </div>
    );
};

// The type of props MyForm receives
interface MyFormProps {
    initialEmail?: string;
    title: string;
    message: string; // if this passed all the way through you might do this or make a union type
}

function isValidEmail(email: string) {
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(email);
}

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
    // Transform outer props into form values
    mapPropsToValues: props => {
        return {
            username: '',
            email: props.initialEmail || '',
            password: '',
        };
    },

    // Add a custom validation function (this can be async too!)
    validate: (values: FormValues) => {
        let errors: FormikErrors<FormValues> = {};
        if (!values.username) {
            errors.username = 'Please choose a username.'
        }
        if (!values.email) {
            errors.email = 'Required';
        } else if (!isValidEmail(values.email)) {
            errors.email = 'Invalid email address';
        }
        if (!values.password) {
            errors.password = 'Please choose a password.'
        }
        return errors;
    },

    handleSubmit: values => {
        // do submitting things
        console.log(values);
    },
})(InnerForm);

const Signup: NextPage = () => {

    return (
        <>
            <MyForm title="Sign up" message="Free forever." />
        </>
    )
}

export default Signup;
