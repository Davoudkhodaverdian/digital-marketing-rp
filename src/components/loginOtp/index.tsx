"use client"
import React, { useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { useLocale, useTranslations } from 'next-intl';
import { ILoginOtp } from '@/fundamental/models/loginOtp';
import { useLoginSchema } from './loginSchema';
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
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        setFieldValue: any
    ) => {
        const value = e.target.value;
        if (/^\d$/.test(value)) {
            setFieldValue(`digit${index + 1}`, value);
            if (inputsRef.current[index + 1]) {
                inputsRef.current[index + 1]?.focus();
            }
        } else if (value === '') {
            setFieldValue(`digit${index + 1}`, '');
        }
    };
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
                    <Form className='mt-[40px]'>
                        <div className='flex gap-4' dir='ltr'>
                            {[0, 1, 2, 3].map((i) => {
                                const digit = i + 1 === 1 ? 'digit1' : i + 1 === 2 ? 'digit2' : i + 1 === 3 ? 'digit3' : 'digit4';
                                return (
                                    <div key={i}>
                                        <Field name={`digit${i + 1}`} >
                                            {({ field }: any) => (
                                                <input
                                                    {...field}
                                                    type="text"
                                                    maxLength={1}
                                                    ref={(el) => (inputsRef.current[i] = el)}
                                                    onChange={(e) => handleChange(e, i, setFieldValue)}
                                                    className="w-[88px] h-[80px]  text-center bg-[#F9F9F9] rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            )}
                                        </Field>
                                        {errors[digit] && touched[digit] ? <div className='w-full font-400 block text-red-700'>{errors[digit]}</div> : null}
                                    </div>
                                )
                            })}
                        </div>
                        <button className='mt-[40px] w-full button' type="submit">{t('form.button.title')}</button>
                    </Form>
                )}
            </Formik>
        </section>
    )
}
export default LoginOtp

