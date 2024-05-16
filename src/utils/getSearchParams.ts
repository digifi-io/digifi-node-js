import { SearchParams } from '../api/base';
import { stringify } from 'qs';

const getSearchParams = (params: SearchParams = {}) => {
  return stringify(params, { indices: false });
};

export default getSearchParams;
