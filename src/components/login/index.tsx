
import React from "react";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';


const Login: React.FC = () => {
  const t = useTranslations();
  return (
    <main>
      <h1>{t('hello')}</h1>
      <Link href="/about">{'yy'}</Link>
      <div className="">
      
      </div>
    </main>
  );
}

export default Login
