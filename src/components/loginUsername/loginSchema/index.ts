import * as Yup from 'yup';
import { useTranslations } from 'next-intl';

export const useLoginSchema = () => {
  const t = useTranslations('login_username.form.inputs.password.validation');

  return Yup.object().shape({
    password: Yup.string().required(t('required')).min(3, t('min'))
  })
}
