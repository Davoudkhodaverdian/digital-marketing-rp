"use client"
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useLoginSchema } from './loginSchema';
import { useLocale, useTranslations } from 'next-intl';
import { ILoginStart } from '@/fundamental/models/loginStart';
import { useRouter } from 'next/navigation';
import LoadingProcess from '../common/loadingProcess';
import { infoMessage } from '@/fundamental/toast';
import { useLoginStart } from '@/fundamental/hooks/useLoginStart';

const Login: React.FC = () => {
    const t = useTranslations('login');
    const LoginSchema = useLoginSchema();
    const [loading, setLoading] = useState(false);
    const locale = useLocale();
    const router = useRouter();
    const loginStart = useLoginStart();
    const handleSubmit = async (loginData: ILoginStart) => {
        try {
            setLoading(true);
            loginStart.mutate(loginData,
                {
                    onSuccess: (data) => {
                        setLoading(false);
                        console.log(data);
                        if (data?.status === "password_required") {
                            router?.push(`/login-username?username=${loginData?.text}`)
                        } else if (data?.status === "otp_sent") {
                            router?.push(`/login-otp?phone=${loginData?.text}`)
                        } else {
                            infoMessage(data?.message[locale || 'fa'])
                        }
                    },
                    onError: (error: any) => {
                        setLoading(false);
                        console.error("❌ Error:", error);
                        console.error("❌ Error:", error?.message);
                        if (error?.message) infoMessage(error?.message)
                    },
                }
            );

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
