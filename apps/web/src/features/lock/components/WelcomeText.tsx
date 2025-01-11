import { useTranslation } from 'react-i18next';
import { Flex } from '../../../components/ui';
import Typography from '../../../components/ui/Typography';

export const WelcomeText = ({ email }: { email: string }) => {
  const { t } = useTranslation();

  return (
    <Flex stack className="gap-1">
      <h2 className="text-3xl font-bold text-center">{t('features.lock.title')}</h2>

      <Typography variant="mdMedium" className="text-foreground-500 text-center">
        {email}
      </Typography>
    </Flex>
  );
};

export default WelcomeText;
