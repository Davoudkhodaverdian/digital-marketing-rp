"use client"
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useLocale, useTranslations } from 'next-intl';
import { ILoginOtp } from '@/fundamental/models/loginOtp';
import { useLoginSchema } from './loginSchema';
import LoginForm from './form';
import { useRouter, useSearchParams } from 'next/navigation';
import CodeProcess from './codeProcess';
import { MobileCodeSituation } from '@/fundamental/models/mobileCodeSituation';
import LoadingProcess from '../common/loadingProcess';
import { infoMessage, successMessage } from '@/fundamental/toast';
import { useVerifyOtp } from '@/fundamental/hooks/useVerifyOtp';
// import { useRouter } from 'next/navigation';

const LoginOtp: React.FC = () => {
    const t = useTranslations('login_otp');
    const locale = useLocale();
    const LoginSchema = useLoginSchema();
    const searchParams = useSearchParams();
    const phone = searchParams.get('phone') || '';
    const [mobileCode, setMobileCode] = useState<MobileCodeSituation>(!phone ? 'expired' : 'active');
    const [loading, setLoading] = useState(false);
    const handelMobileCode = (situation: MobileCodeSituation) => {
        if (situation !== mobileCode) setMobileCode(situation);
    }
    const verifyOtp = useVerifyOtp();
    const router = useRouter();
    useEffect(() => {
        if (!phone) router.push('/');

    })

    // const router = useRouter();
    const handleSubmit = async (loginData: ILoginOtp) => {
        try {
            if (mobileCode === 'expired') {
                infoMessage(t('code_process.expire_message'))
            }
            const otp = `${loginData?.digit1}${loginData?.digit2}${loginData?.digit3}${loginData?.digit4}`;
            setLoading(true);
            verifyOtp.mutate({ phone, otp },
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

        } catch (error) {
            setLoading(false);
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
            {loading && <LoadingProcess />}
            <CodeProcess mobileCode={mobileCode} handelMobileCode={handelMobileCode} />
        </section>
    )
}
export default LoginOtp

