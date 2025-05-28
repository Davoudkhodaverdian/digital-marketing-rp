import * as Yup from 'yup';
import { useTranslations } from 'next-intl';

export const useLoginSchema = () => {
  const t = useTranslations('login_otp.form.inputs.digit.validation');

  return Yup.object().shape({
    digit1: Yup.string().required(t('required')).matches(/^\d$/, t('only_digits')),
    digit2: Yup.string().required(t('required')).matches(/^\d$/, t('only_digits')),
    digit3: Yup.string().required(t('required')).matches(/^\d$/, t('only_digits')),
    digit4: Yup.string().required(t('required')).matches(/^\d$/, t('only_digits')),
  })
}
