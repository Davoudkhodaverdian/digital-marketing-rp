"use client"
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useLoginSchema } from './loginSchema';
import { useLocale, useTranslations } from 'next-intl';
import customFetch from '@/fundamental/customFetch';
import { ILoginStart } from '@/fundamental/models/loginStart';
import { useRouter } from 'next/navigation';
import LoadingProcess from './loadingProcess';

const Login: React.FC = () => {
    const t = useTranslations('login');
    const LoginSchema = useLoginSchema();
    const [loading, setLoading] = useState(false);
    const locale = useLocale();
    const router = useRouter();
    const handleSubmit = async (data: ILoginStart) => {
        try {
            setLoading(true);
            const response = await customFetch<ILoginStart>('/auth/start', data, { method: "POST" });
            setLoading(false);
            console.log(response);
            if (response?.status === "password_required") {
                router?.push('/login-username')
            } else if (response?.status === "otp_sent") {
                router?.push('/login-otp')
            }
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }
    return (
        <section
            className={`mt-[80px]`}
            dir={locale === 'fa' ? 'rtl' : 'ltr'}>
            <h1 className='font-700 text-center'>{t('form.title')}</h1>
            <Formik
                initialValues={{ text: '', }}
                validationSchema={LoginSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                    handleSubmit(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form className='mt-[40px]'>
                        <div className=''>
                            <label className='w-full font-400 block mb-2' htmlFor="text">{t('form.inputs.text.title')}</label>
                            <Field placeholder={t('form.inputs.text.placeholder')}
                                className={`w-full font-400 block input ${loading ? 'cursor-not-allowed' : ''}`}
                                id="text" name="text" type="text" />
                        </div>
                        {errors.text && touched.text ? <div className='w-full font-400 block text-red-700'>{errors.text}</div> : null}
                        <button className={`mt-[40px] w-full button ${loading ? 'cursor-not-allowed' : ''}`} type="submit">{t('form.button.title')}</button>
                        {loading && <LoadingProcess />}
                    </Form>
                )}
            </Formik>
        </section>
    )
}
export default Login;
