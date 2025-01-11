import { useTranslation } from 'react-i18next';
import { Flex } from '../../../components/ui';
import Typography from '../../../components/ui/Typography';

export const WelcomeText = () => {
  const { t } = useTranslation();

  return (
    <Flex stack className="gap-1">
      <h2 className="text-3xl font-bold text-center">{t('features.register.getStarted')}</h2>

      <Typography variant="smMedium" className="text-foreground-500 text-center">
        {t('features.register.welcome')}
      </Typography>
    </Flex>
  );
};

export default WelcomeText;
