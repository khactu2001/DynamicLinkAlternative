import {UseInfiniteQueryOptions, useInfiniteQuery} from '@tanstack/react-query';
import API from '../../api/api';

const HOME_PATHNAME = {
  GET_IMAGES_URL: 'photos/',
  SEARCH_IMAGES_URL: 'search/',
  GET_RANDOM_IMAGES_URL: 'photos/random',
};

export const GET_PHOTOS_KEY = 'get-photos';

type InfiniteQueryParams = {
  pageParam: number;
};
type TImagesParams = 'page' | 'per_page' | 'order_by';

type TGetImagesParams = {
  [Key in TImagesParams]: string | number;
} & InfiniteQueryParams;

const api = new API();
const getPhotos = async (
  props: TGetImagesParams = {
    page: 1,
    per_page: 20,
    order_by: 'latest',
    pageParam: 1,
  },
) => {
  const results = await api.get(HOME_PATHNAME.GET_IMAGES_URL, props);
  return {
    result: results,
    nextPageParam: (props.page as number) + 1,
  };
};

export const useGetPhotos = (props: TGetImagesParams) => {
  return useInfiniteQuery({
    queryKey: [GET_PHOTOS_KEY],
    queryFn: ({pageParam = 1}) =>
      getPhotos({
        ...props,
        page: pageParam,
      }),
    getNextPageParam: lastPage => {
      return lastPage.nextPageParam;
    },
  });
};
