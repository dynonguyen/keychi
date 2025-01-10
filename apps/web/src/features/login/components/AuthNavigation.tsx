import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Flex } from '../../../components/ui';
import { PATH } from '../../../constants/path';

export const AuthNavigation = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const items: Array<{ text: string; to: string; active?: boolean }> = [
    { text: t('common.signIn'), to: PATH.LOGIN, active: pathname.includes(PATH.LOGIN) },
    { text: t('common.signUp'), to: PATH.REGISTER, active: pathname.includes(PATH.REGISTER) }
  ];

  return (
    <Flex className="w-80 h-11 max-w-full p-1 rounded-xl bg-neutral-200 justify-between">
      {items.map((item) => (
        <Flex
          center
          className={clsx(
            'size-full text-sm rounded-lg',
            item.active ? 'font-semibold bg-neutral-50' : 'text-foreground-500'
          )}
          key={item.to}
        >
          <Link to={item.to}>{item.text}</Link>
        </Flex>
      ))}
    </Flex>
  );
};

export default AuthNavigation;
