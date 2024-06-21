import {
  QueryOptions,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import {TImage} from '~models/image-model';
import {
  BaseQueryParams,
  InfiniteQueryParams,
  QueryParams,
} from '~models/common-model';
import {getCollections, searchCollections} from '~api/collection-api';
import {axiosService} from '~api/api';

const HOME_PATHNAME = {
  GET_IMAGES_URL: 'photos/',
  SEARCH_PHOTOS: 'search/photos',
  SEARCH_IMAGES_URL: 'search/',
  GET_RANDOM_IMAGES_URL: 'photos/random',
};

export const GET_PHOTOS_KEY = 'get-photos';
export const SEARCH_PHOTOS_KEY = 'search-photos';
export const GET_COLLECTIONS_KEY = 'get-collections';
export const SEARCH_COLLECTIONS_KEY = 'search-collections';

type TImagesParams = 'page' | 'per_page' | 'order_by' | 'query';

type SearchPhotoResponse = {
  total: number;
  results: TImage[];
  total_pages: number;
};

type TGetImagesParams = {
  [Key in TImagesParams]?: string | number;
} & InfiniteQueryParams;
type TSearchImagesParams = {
  [Key in TImagesParams]?: string | number;
};

const getPhotos = async (
  props: TGetImagesParams = {
    page: 1,
    per_page: 20,
    order_by: 'latest',
    pageParam: 1,
  },
) => {
  const results = await axiosService.get(HOME_PATHNAME.GET_IMAGES_URL, props);
  return {
    result: results ?? [],
    nextPageParam: (props.page as number) + 1,
  };
};
const searchPhotos = async (props: TSearchImagesParams) => {
  const response: SearchPhotoResponse = await axiosService.get(
    HOME_PATHNAME.SEARCH_PHOTOS,
    props,
  );
  return response;
};

const getQueryKey = () => {
  return [GET_PHOTOS_KEY];
};

const getSearchQueryKey = (props: TSearchImagesParams) => {
  return [SEARCH_PHOTOS_KEY, props.query];
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
export const useSearchPhotos = (props: TSearchImagesParams) => {
  return useInfiniteQuery({
    queryKey: getSearchQueryKey(props),
    queryFn: ({pageParam = 1}) =>
      searchPhotos({
        ...props,
        page: pageParam,
      }),
    enabled: props.query ? true : false,
    getNextPageParam: (lastPage, allPages) => {
      let currentPage = 0;
      const currentItemsLength = allPages.reduce(
        (downloadedLength: number, current: SearchPhotoResponse) => {
          currentPage += 1;
          return downloadedLength + current?.results?.length ?? 0;
        },
        0,
      );
      if (lastPage.total <= currentItemsLength) return undefined;
      return currentPage + 1;
    },
  });
};

const getQueryKeyCollection = () => {
  return [GET_COLLECTIONS_KEY];
};

export const useInfiniteQueryCollection = (props: BaseQueryParams) => {
  return useInfiniteQuery({
    queryKey: getQueryKeyCollection(),
    queryFn: ({pageParam = 1}) =>
      getCollections({
        ...props,
        page: pageParam,
      }),
    getNextPageParam: lastPage => {
      return lastPage.nextPageParam;
    },
  });
};

type TInfiniteQueryParams = {
  queryKey: string[];
  queryFn: () => Promise<any>;
  getNextPageParam?: (lastPage: any, allPages: any) => any;
  enabled?: boolean;
};

export const useFetchInfinite = (params: TInfiniteQueryParams) => {
  // return useInfiniteQuery({
  //   queryKey: ['sdfsdf'],
  //   queryFn: () => params.queryFn(),
  //   getNextPageParam: params.getNextPageParam,
  //   select: data => data.pages.length,
  // });
  // const {data, ...rest} = useInfiniteQuery(params.queryKey, params.queryFn, {
  //   select: data => {
  //     return {
  //       ...data,
  //       pages: data.pages.map(page => {
  //       }
  //   },
  // });
};

export const useSearchCollections = (
  queryKey: string[],
  props: BaseQueryParams & QueryParams,
) => {
  return useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({pageParam = 1}) =>
      searchCollections({
        page: pageParam,
        per_page: props?.per_page ?? 10,
        query: props?.query,
      }),
    getNextPageParam: lastPage => {
      return lastPage.nextPageParam;
    },
  });
};
