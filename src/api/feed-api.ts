import {useInfiniteQuery} from '@tanstack/react-query';
import API from './api';

const HOME_PATHNAME = {
  GET_IMAGES_URL: 'photos/',
  SEARCH_IMAGES_URL: 'search/',
  GET_RANDOM_IMAGES_URL: 'photos/random',
};

type InfiniteQueryParams = {
  pageParam: number;
};
type TImagesParams = 'page' | 'per_page' | 'order_by';

type TGetImagesParams = {
  [Key in TImagesParams]: string | number;
} & InfiniteQueryParams;

const api = new API();
const getImages = async (
  props: TGetImagesParams = {
    page: 1,
    per_page: 20,
    order_by: 'latest',
    pageParam: 1,
  },
) => {
  props.page = props.pageParam;
  const results = await api.get(HOME_PATHNAME.GET_IMAGES_URL, props);
  // console.log(
  //   '---call api---',
  //   results?.map(item => item.id),
  //   props.pageParam,
  // );
  return {
    result: results,
    nextPageParam: props.pageParam + 1,
  };
};

export const useFetchImages = (props?: TGetImagesParams) => {
  return useInfiniteQuery({
    queryKey: ['/photos'],
    queryFn: ({pageParam = 1}) =>
      getImages({
        ...props!,
        pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.nextPageParam > 40) return undefined;
      return lastPage.nextPageParam;
    },
    keepPreviousData: true,
  });
};
