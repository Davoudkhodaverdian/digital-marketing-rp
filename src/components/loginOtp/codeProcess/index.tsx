import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MobileCodeSituation } from '@/fundamental/models/mobileCodeSituation';
interface Props {
    mobileCode: MobileCodeSituation
    handelMobileCode: (situation: MobileCodeSituation) => void
}

const CodeProcess: React.FC<Props> = ({ mobileCode, handelMobileCode }) => {

    const t = useTranslations('login_otp.code_process');
    const duration = 120
    const barRef = useRef<HTMLDivElement>(null);
    const second = useRef<null | HTMLSpanElement>(null);
    const sendCode = () => {
        if (second?.current) {
            second?.current?.setHTMLUnsafe("02:00");
            handelMobileCode('active');
        }
    }
    useEffect(() => {
        if (!second?.current && mobileCode === 'expired') return;
        let current = 0;
        const setIntervalForSeconds = setInterval(() => {

            current++;
            const percent = (current / duration) * 100;
            if (barRef.current) {
                barRef.current.style.width = `${percent}%`;
            }
            const text = second?.current;
            if (text?.innerHTML === "00:00") {
                clearInterval(setIntervalForSeconds);
                handelMobileCode("expired");
                return;
            }
            if (text?.innerHTML === "02:00") text?.setHTMLUnsafe("01:59");
            else if (text?.innerHTML === "01:00") text?.setHTMLUnsafe("00:59");
            else {
                const tens = Number(text?.innerHTML.split(":")[0]);
                const ones = Number(text?.innerHTML.split(":")[1]);
                const newNum = ones <= 10 ? `0${(ones - 1)}` : (ones - 1); // add 0 when second is less than 10
                text?.setHTMLUnsafe(`0${tens}:${newNum}`);
            }
        }, 1000);
        return () => {
            // Cleanup code to run when the component unmounts
            if (setIntervalForSeconds) clearInterval(setIntervalForSeconds);
        };
    }, [mobileCode])

    return (
        <>
            <div className={`mt-[40px] ${mobileCode === 'active' ? '' : 'hidden'}`}>
                <div dir='ltr' className="w-full mx-auto rounded-[8px] h-2 bg-[#E8E6FE] overflow-hidden">
                    <div ref={barRef}
                        className="h-full bg-[#B9B2FB] transition-all duration-1000"
                        style={{ width: '0%' }}
                    />
                </div>
                <div className={'flex justify-center gap-[11px] mt-[27px]'}>
                    <p className='font-400'>{t('get_code_question')}</p>
                    <p className='font-500 text-[#404EB2]'>{t('send_code_duration.start')}{' '}<span className={'font-500 text-[#404EB2]'} ref={second}>02:00</span>{' '}{t('send_code_duration.end')}</p>
                </div>
            </div>
            <button onClick={sendCode} className={mobileCode === 'expired' ? 'button mt-[27px]' : 'hidden'}>{t('send_code')}</button>
        </>
    )
}
export default CodeProcess;