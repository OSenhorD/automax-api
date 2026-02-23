import { IParams } from '@/interfaces/shared';

export const getValidParams = (params: IParams) => {
  const invalid = ['search', 'filter', 'page', 'pageSize', 'noPagination'];

  params = params ?? {};
  let obj: IParams = {};
  Object.keys(params)
    .filter(
      (key) =>
        !invalid.includes(key) &&
        (typeof params[key] != 'string' || (typeof params[key] == 'string' && params[key] != ''))
    )
    .map((key) => (obj[key] = params[key]));

  return obj;
};
