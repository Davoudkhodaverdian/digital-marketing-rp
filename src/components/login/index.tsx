
import React from "react";
import { useTranslations } from 'next-intl';
// import { Link } from '@/i18n/navigation';
import { LoginForm } from "./form";
import SelectLanguage from "../common/selectLanguage";

const Login: React.FC = () => {
  // const t = useTranslations();
  return (
    <main className="p-[30px]">
      {/* <h1 className="">{t('hello')}</h1> */}
      {/* <Link href="/about">{'yy'}</Link> */}
      <section className="flex justify-center  gap-[74px]">
        <section className='w-full max-w-[440px] px-5 flex flex-col justify-center'>
          <figure className="flex justify-center">
            <img src="/images/scope.png" alt="scope" width={300} height={60} />
          </figure>
          <LoginForm />
          <div className="w-full flex justify-center pt-5">
            <SelectLanguage />
          </div>
        </section>
        <figure className="">
          <img className="" src="/images/architecture.png" alt="scope" width={708} height={708} />
        </figure>
      </section>
    </main>
  );
}

export default Login
