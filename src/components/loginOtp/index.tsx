"use client"
import React from 'react';
import { Formik } from 'formik';
import { useLocale, useTranslations } from 'next-intl';
import { ILoginOtp } from '@/fundamental/models/loginOtp';
import { useLoginSchema } from './loginSchema';
import LoginForm from './form';
// import customFetch from '@/fundamental/customFetch';
// import { useRouter } from 'next/navigation';

const LoginOtp: React.FC = () => {
    const t = useTranslations('login_otp');
    const locale = useLocale();
    const LoginSchema = useLoginSchema();
    // const router = useRouter();
    const handleSubmit = async (data: ILoginOtp) => {
        try {
            // const response = await customFetch<ILoginOtp>('/???', data, { method: "POST" });
            // console.log(response);
            // if (response?.status === "password_required") {
            //     router?.push('/login-with-password')
            // }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <section className='mt-[80px]' dir={locale === 'fa' ? 'rtl' : 'ltr'}>
            <h1 className='font-700 text-center'>{t('form.title')}</h1>
            <Formik
                initialValues={{ digit1: '', digit2: '', digit3: '', digit4: '' }}
                validationSchema={LoginSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                    handleSubmit(values);
                }}
            >
                {({ errors, touched, setFieldValue }) => (
                    <LoginForm errors={errors} touched={touched} setFieldValue={setFieldValue} />
                )}
            </Formik>
        </section>
    )
}
export default LoginOtp

