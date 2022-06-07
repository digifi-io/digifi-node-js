const getSearchParams = (params: Record<string, string | Array<string>> | Array<string[]> = {}) => {
  let urlSearchParams = new URLSearchParams();

  if (Array.isArray(params)) {
    urlSearchParams = new URLSearchParams(params);
  } else {
    Object.keys(params).forEach((key) => {
      const param = params[key];

      if (Array.isArray(param)) {
        param.forEach(value => urlSearchParams.append(key, value));
      } else {
        urlSearchParams.append(key, param);
      }
    });
  }

  return urlSearchParams;
};

export default getSearchParams;
