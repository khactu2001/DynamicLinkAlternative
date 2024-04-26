export type RenderItemType<T> = {
  item: T;
  index: number;
};

export const keyExtractor = (item: {id: number; index: number}) => {
  return item?.id ? `${item.id}` : `${item?.index}`;
};

export type InfiniteQueryParams = {
  pageParam: number;
};

export type BaseQueryParams = {
  page: number;
  per_page: number;
};
