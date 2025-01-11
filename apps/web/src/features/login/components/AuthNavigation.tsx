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
    <Flex className="w-96 h-11 max-w-full p-1 rounded-xl bg-neutral-200 justify-between gap-1">
      {items.map((item) => (
        <Link
          className={clsx(
            'flex items-center justify-center size-full text-sm rounded-lg w-full cursor-pointer',
            item.active ? 'font-semibold bg-neutral-50' : 'text-foreground-500 hover:bg-neutral-50/40 transition-colors'
          )}
          key={item.to}
          to={item.to}
        >
          {item.text}
        </Link>
      ))}
    </Flex>
  );
};

export default AuthNavigation;
