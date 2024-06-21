import {Collection} from '~models/collection_model';
import {BaseQueryParams, QueryParams} from '~models/common-model';
import {axiosService} from './api';

const COLLECTION_PATHNAME = {
  GET_COLLECTIONS_URL: 'collections/',
  SEARCH_COLLECTIONS: 'search/collections',
};

export const getCollections = async (props: BaseQueryParams) => {
  const results: Collection[] = await axiosService.get(
    COLLECTION_PATHNAME.GET_COLLECTIONS_URL,
    props,
  );
  return {
    result: results,
    nextPageParam: results.length > 0 ? (props?.page ?? 0) + 1 : undefined,
  };
};

export const searchCollections = async (
  props: BaseQueryParams & QueryParams,
) => {
  const results: Collection[] = await axiosService.get(
    COLLECTION_PATHNAME.SEARCH_COLLECTIONS,
    props,
  );
  return {
    result: results,
    nextPageParam: results.length > 0 ? (props?.page ?? 0) + 1 : undefined,
  };
};
