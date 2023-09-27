export type RenderItemType<T> = {
  item: T;
  index: number;
};

export const keyExtractor = (item: {id: number; index: number}) => {
  return item?.id ? `${item.id}` : `${item?.index}`;
};
