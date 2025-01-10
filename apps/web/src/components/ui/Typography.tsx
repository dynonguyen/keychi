import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '../../utils/cn';

const typographyVariants = cva('keychi-typography', {
  variants: {
    variant: {
      xsRegular: 'text-xs font-normal',
      xsMedium: 'text-xs font-medium',
      xsSemibold: 'text-xs font-semibold',
      smRegular: 'text-sm font-normal',
      smMedium: 'text-sm font-medium',
      smSemiBold: 'text-sm font-semibold',
      mdRegular: 'text-md font-normal',
      mdMedium: 'text-md font-medium',
      mdSemiBold: 'text-md font-semibold',
      lgRegular: 'text-lg font-normal',
      lgMedium: 'text-lg font-medium',
      lgSemiBold: 'text-lg font-semibold',
      xlRegular: 'text-xl font-normal',
      xlMedium: 'text-xl font-medium',
      xlSemiBold: 'text-xl font-semibold',
      displayRegular: 'text-2xl font-normal',
      displayMedium: 'text-2xl font-medium',
      displaySemiBold: 'text-2xl font-semibold'
    }
  },
  defaultVariants: {
    variant: 'mdRegular'
  }
});

export type TypographyProps = VariantProps<typeof typographyVariants> &
  React.HTMLAttributes<HTMLElement> & {
    component?: React.ElementType;
    ref?: React.Ref<HTMLElement>;
  };

export const Typography = (props: TypographyProps) => {
  const { component = 'div', className, variant, ref, ...others } = props;

  return React.createElement(component, {
    ref,
    className: cn(typographyVariants({ variant, className })),
    ...others
  });
};

export default Typography;
