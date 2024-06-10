import {useInfiniteQuery} from '@tanstack/react-query';
import {axiosService} from './api';
import {Collection} from '~models/collection_model';
import {BaseQueryParams, InfiniteQueryParams} from '~models/common-model';

const COLLECTION_PATHNAME = {
  GET_COLLECTIONS_URL: 'collections/',
};

export const getCollections = async (props: BaseQueryParams) => {
  const results: Collection[] = await axiosService.get(
    COLLECTION_PATHNAME.GET_COLLECTIONS_URL,
    props,
  );
  return {
    result: results,
    nextPageParam: results.length > 0 ? props.page + 1 : undefined,
  };
};
