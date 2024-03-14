export const getOffsetPageParams = ({
  url,
  isSearch,
}: {
  url: string;
  isSearch?: boolean;
}): string | undefined => {
  if (url.split('?')[1]) {
    return url.split('?')[1].split('&')[isSearch ? 0 : 2].split('=')[1];
  }
  return undefined;
};
