const HOME_PATHNAME = {
  GET_IMAGES_URL: 'photos/',
  SEARCH_IMAGES_URL: 'search/',
  GET_RANDOM_IMAGES_URL: 'photos/random',
};

import {axiosService} from './api';

type TImagesParams = 'page' | 'per_page' | 'order_by';
type TGetImagesParams = {
  [Key in TImagesParams]: string | number;
};

export default class HomeService {
  getImages = async (
    props: TGetImagesParams = {
      page: 1,
      per_page: 10,
      order_by: 'latest',
    },
  ) => {
    const results = await axiosService.get(HOME_PATHNAME.GET_IMAGES_URL, props);

    return results;
  };

  searchImages = async () => {
    const results = await axiosService.get(HOME_PATHNAME.SEARCH_IMAGES_URL);

    return results;
  };

  getRandomImages = async () => {
    const results = await axiosService.get(HOME_PATHNAME.GET_RANDOM_IMAGES_URL);

    return results;
  };
}
