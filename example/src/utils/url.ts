export const withSlash = (data: string | string[]): string => {
  if (Array.isArray(data)) {
    return data.reduce((result, item) => result + (item[0] === '/' ? item : `/${item}`), '').replaceAll('//', '/');
  }
  return data[0] === '/' ? data : `/${data}`;
};

export const openLink = (href: string) => {
  window.open(href, '_self');
};
