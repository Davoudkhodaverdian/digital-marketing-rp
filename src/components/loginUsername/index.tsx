"use client"
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useLoginSchema } from './loginSchema';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { ILoginUsename } from '@/fundamental/models/loginUsename';
import LoadingProcess from '../common/loadingProcess';
import { infoMessage, successMessage } from '@/fundamental/toast';
import { useVerifyPassword } from '@/fundamental/hooks/useVerifyPassword';


const LoginUsername: React.FC = () => {
    const t = useTranslations('login_username');
    const LoginSchema = useLoginSchema();
    const locale = useLocale();
    const searchParams = useSearchParams();
    const username = searchParams.get('username') || '';
    const router = useRouter();
    const verifyPassword = useVerifyPassword();
    useEffect(() => {
        if (!username) router.push('/')
    })
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (loginData: ILoginUsename) => {
        try {
            setLoading(true);
            verifyPassword.mutate({ username, password: loginData?.password },
                {
                    onSuccess: (data) => {
                        setLoading(false);
                        if (data?.status === "successful") {
                            successMessage(data?.message[locale || 'fa'])
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
            setLoading(false);

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
                    </Form>
                )}
            </Formik>
            {loading && <LoadingProcess />}
        </section>
    )
}
export default LoginUsername;
