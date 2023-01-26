import { SearchParams } from '../api/BaseSystemApi';

const getSearchParams = (params: SearchParams = {}) => {
  let urlSearchParams = new URLSearchParams();

  if (Array.isArray(params)) {
    urlSearchParams = new URLSearchParams(params);
  } else {
    Object.keys(params).forEach((key) => {
      const param = params[key];

      if (Array.isArray(param)) {
        param.forEach(value => urlSearchParams.append(key, value));
      } else {
        if (param !== undefined) {
          urlSearchParams.append(key, param.toString());
        }
      }
    });
  }

  return urlSearchParams;
};

export default getSearchParams;
