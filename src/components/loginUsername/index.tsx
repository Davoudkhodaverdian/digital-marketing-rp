"use client"
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useLoginSchema } from './loginSchema';
import { useLocale, useTranslations } from 'next-intl';

const LoginUsername: React.FC = () => {
    const t = useTranslations('login_username');
    const LoginSchema = useLoginSchema();
    const locale = useLocale();
    return (
        <section className='mt-[80px]' dir={locale === 'fa' ? 'rtl' : 'ltr'}>
            <h1 className='font-700 text-center'>{t('form.title')}</h1>
            <Formik
                initialValues={{ password: '', }}
                validationSchema={LoginSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
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
        </section>
    )
}
export default LoginUsername;
