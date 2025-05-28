import * as Yup from 'yup';
import { useTranslations } from 'next-intl';

export const useLoginSchema = () => {
  const t = useTranslations('login.form.inputs.text.validation');

  return Yup.object().shape({
    text: Yup.string()
      .required(t('required'))
      .test('is-valid', t('invalid_identifier'), function (value = '') {
        const phoneRegex = /^09\d{9}$/;
        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{3,19}$/;

        // phone is not valid
        if (/^0/.test(value) && !phoneRegex.test(value)) {
          return this.createError({ message: t('phone_invalid') });
        } else if (!phoneRegex.test(value)){
          // usename is not valid
          if (/^[a-zA-Z0-9]/.test(value) && !usernameRegex.test(value)) {
            if (!/^[a-zA-Z]/.test(value)) {
              return this.createError({ message: t('username_invalid') });
            }
            if (value.length < 4 || value.length > 20) {
              return this.createError({ message: t('username_length') });
            }
          }
        }
        // phone and usename are not valid
        if (!phoneRegex.test(value) && !usernameRegex.test(value)) {
          return this.createError({ message: t('invalid_identifier') });
        }

        return true; // phone or usename is valid
      })
  });

}
