"use client"
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useLoginSchema } from './loginSchema';
import { useLocale, useTranslations } from 'next-intl';

export const LoginForm: React.FC = () => {
    const t = useTranslations('login_username');
    const LoginSchema = useLoginSchema();
     const locale = useLocale();
    return (

        <div className='' dir={locale === 'fa' ? 'rtl' : 'ltr'}>
            <h1 className='font-700 text-center'>{t('form.title')}</h1>
            <Formik
                initialValues={{
                    text: '',
                }}
                validationSchema={LoginSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form className=''>
                        <div className=''>
                            <label className='w-full font-400 block' htmlFor="text">{t('form.inputs.text.title')}</label>
                            <Field placeholder={t('form.inputs.text.placeholder')} className='w-full font-400 block input' name="text" type="text" />
                        </div>
                        {errors.text && touched.text ? <div className='w-full font-400 block text-red-700'>{errors.text}</div> : null}
                        <button className='w-full button' type="submit">{t('form.button.title')}</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

