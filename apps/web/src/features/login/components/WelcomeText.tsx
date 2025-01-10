import { useTranslation } from 'react-i18next';
import { Flex } from '../../../components/ui';
import Typography from '../../../components/ui/Typography';

export const WelcomeText = () => {
  const { t } = useTranslation();

  return (
    <Flex stack className="gap-1">
      <h2 className="text-3xl font-bold text-center">{t('features.login.welcomeBack')}</h2>

      <Typography variant="smMedium" className="text-foreground-500">
        {t('features.login.enterDetails')}
      </Typography>
    </Flex>
  );
};

export default WelcomeText;
