"use client"
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useLoginSchema } from './loginSchema';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { ILoginUsename } from '@/fundamental/models/loginUsename';
import customFetch from '@/fundamental/customFetch';
import LoadingProcess from '../common/loadingProcess';


const LoginUsername: React.FC = () => {
    const t = useTranslations('login_username');
    const LoginSchema = useLoginSchema();
    const locale = useLocale();
    const searchParams = useSearchParams();
    const username = searchParams.get('username');
    const router = useRouter();
    useEffect(() => {
        if (!username) router.push('/')
    })
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: ILoginUsename) => {
        try {
            setLoading(true);
            const response = await customFetch<ILoginUsename>(`/auth/verify-password?username=${username}`, data, { method: "POST" });
            setLoading(false);
            console.log(response);
            if (response?.status === "successful") {
                alert(response?.message[locale || 'fa'])
            } else {
                alert(response?.message[locale || 'fa'])
            }
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }
    return (
        <section className='mt-[80px]' dir={locale === 'fa' ? 'rtl' : 'ltr'}>
            <h1 className='font-700 text-center'>{t('form.title')}</h1>
            <Formik
                initialValues={{ password: '', }}
                validationSchema={LoginSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                    handleSubmit(values)
                }}
            >
                {({ errors, touched }) => (
                    <Form className='mt-[40px]'>
                        <div className=''>
                            <label className='w-full font-400 block mb-2' htmlFor="password">{t('form.inputs.password.title')}</label>
                            <Field placeholder={t('form.inputs.password.placeholder')} className='w-full font-400 block input' id="password" name="password" type="password" />
                        </div>
                        {errors.password && touched.password ? <div className='w-full font-400 block text-red-700'>{errors.password}</div> : null}
                        <button className='mt-[40px] w-full button' type="submit">{t('form.button.title')}</button>
                        {loading && <LoadingProcess />}
                    </Form>
                )}
            </Formik>
        </section>
    )
}
export default LoginUsername;
