import clsx from 'clsx';
import { useProfileStore } from '../stores/profile';
import { Flex, FlexProps } from './ui';

export const UserAvatar = ({ className, ...others }: FlexProps) => {
  const name = useProfileStore((state) => state.name);
  const letter = name ? name[0].toUpperCase() : '';

  return (
    <Flex
      center
      className={clsx('rounded-full size-8 bg-pink-600 text-white font-semibold shrink-0', className)}
      {...others}
    >
      {letter}
    </Flex>
  );
};

export default UserAvatar;
