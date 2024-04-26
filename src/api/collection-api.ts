import {useInfiniteQuery} from '@tanstack/react-query';
import API from './api';
import {Collection} from '~models/collection_model';
import {BaseQueryParams, InfiniteQueryParams} from '~models/common-model';

const COLLECTION_PATHNAME = {
  GET_COLLECTIONS_URL: 'collections/',
};

const api = new API();
export const getCollections = async (
  props: BaseQueryParams & InfiniteQueryParams,
) => {
  props.page = props.pageParam;
  const results: Collection[] = await api.get(
    COLLECTION_PATHNAME.GET_COLLECTIONS_URL,
    props,
  );
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
