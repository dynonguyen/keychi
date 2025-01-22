import { SHADCN_COLOR_PALETTE } from '@keychi/shared/constants';
import { generateCssVariables } from '@keychi/shared/utils/tailwind-helper';
import React from 'react';

export const useGenerateCssVariable = () => {
  React.useEffect(() => {
    const light = generateCssVariables(SHADCN_COLOR_PALETTE.light);
    const dark = generateCssVariables(SHADCN_COLOR_PALETTE.dark);

    const styleTag = document.createElement('style');
    styleTag.id = 'keychi-theme';

    const toCssVar = (palette: typeof light) => JSON.stringify(palette).replace(/"/g, '').replace(/,/g, ';');

    styleTag.innerHTML = `:root${toCssVar(light)} .dark${toCssVar(dark)}`;
    document.head.appendChild(styleTag);
  }, []);
};

export default useGenerateCssVariable;
