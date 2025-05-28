import SelectLanguage from '@/components/common/selectLanguage';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about')
  return (
    <>
      <div>{t('title')}</div>
      <SelectLanguage />
    </>
  );
}