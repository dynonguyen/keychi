import { omitBy } from 'lodash-es';
import React from 'react';
// eslint-disable-next-line no-restricted-imports
import { SetURLSearchParams, useSearchParams } from 'react-router-dom';
import { Any } from '../../types/util.type';
import { toNumber } from '../../utils/helper';

export type SafeSearchParams<E = Record<string, Any>> = {
  page: number;
  pageSize: number;
  sortBy?: string;
  order?: string;
  searchBy?: string;
  keyword?: string;
  tab?: string;

  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;

  setParams(params: Partial<SafeSearchParams<E>>, options?: { override?: boolean; resetPage?: boolean }): void;
  deleteParams(keys: string | string[], options?: { resetPage?: boolean }): void;
  resetParams(): void;
} & E;

export type SafeSearchParamsOptions<E> = {
  defaultValues?: Partial<SafeSearchParams<E>>;
  resetPageOnChange?: boolean;
  validation?: Partial<Record<keyof SafeSearchParams<E>, (value: Any) => boolean>>;
  transform?: Partial<Record<keyof SafeSearchParams<E>, (value: Any) => Any>>;
};

// -----------------------------
const searchParamsDefaultValue: Partial<SafeSearchParams> = {
  page: 1,
  pageSize: 10
};

// -----------------------------
export function useSafeSearchParams<E = Record<string, Any>>(
  options?: SafeSearchParamsOptions<E>
): SafeSearchParams<E> {
  const { resetPageOnChange, defaultValues: defaultValuesOpt, validation, transform } = options || {};
  const defaultValues = { ...searchParamsDefaultValue, ...defaultValuesOpt };

  const [searchParams, setSearchParams] = useSearchParams();

  const setParams: SafeSearchParams['setParams'] = (params, options) => {
    const { override, resetPage } = options || {};
    const isResetPage = resetPageOnChange || resetPage;

    const _searchParams = override ? new URLSearchParams() : searchParams;

    Object.keys(params).forEach((key) => {
      const value = params[key as keyof SafeSearchParams];
      _searchParams.set(key, `${value}`);
    });

    if (isResetPage) {
      _searchParams.delete('page');
    }

    setSearchParams(_searchParams);
  };

  const deleteParams: SafeSearchParams['deleteParams'] = (keys, options) => {
    const { resetPage } = options || {};
    const isResetPage = resetPageOnChange || resetPage;

    const deleted = typeof keys === 'string' ? [keys] : keys;

    deleted.forEach((key) => searchParams.delete(key));
    if (isResetPage) searchParams.delete('page');

    setSearchParams(searchParams);
  };

  const resetParams = React.useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, []);

  const params: Partial<SafeSearchParams> = {};
  for (const [key, value] of searchParams.entries()) {
    // @ts-ignore
    params[key] = value || defaultValues[key];
  }

  params.page = toNumber(params.page, defaultValues.page, {
    allowNegative: false,
    allowNull: false,
    allowZero: false
  }) as number;
  params.pageSize = toNumber(params.pageSize, defaultValues.pageSize, {
    allowNegative: false,
    allowNull: false,
    allowZero: false
  }) as number;

  const validParams = omitBy(params, (p) => p === null || p === undefined) as SafeSearchParams;

  if (validation) {
    const keys = Object.keys(validation);

    keys.forEach((key) => {
      if (!validation[key as keyof SafeSearchParams<E>]!(validParams[key])) {
        delete validParams[key];
      }
    });
  }

  if (transform) {
    const keys = Object.keys(transform);
    keys.forEach((key) => {
      validParams[key] = transform[key as keyof SafeSearchParams<E>]!(validParams[key]);
    });
  }

  return {
    ...validParams,

    searchParams,
    setSearchParams,

    setParams,
    deleteParams,
    resetParams
  } as SafeSearchParams<E>;
}

export default useSafeSearchParams;
