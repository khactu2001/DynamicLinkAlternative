const HOME_PATHNAME = {
  GET_IMAGES_URL: 'photos/',
  SEARCH_IMAGES_URL: 'search/',
  GET_RANDOM_IMAGES_URL: 'photos/random',
};

import API from './api';
const api = new API();

type TImagesParams = 'page' | 'per_page' | 'order_by';
type TGetImagesParams = {
  [Key in TImagesParams]: string;
};

export default class HomeService {
  getImages = async (props: TGetImagesParams) => {
    const results = await api.get(
      HOME_PATHNAME.GET_IMAGES_URL,
      undefined,
      props,
    );

    return results;
  };

  searchImages = async () => {
    const results = await api.get(HOME_PATHNAME.SEARCH_IMAGES_URL);

    return results;
  };

  getRandomImages = async () => {
    const results = await api.get(HOME_PATHNAME.GET_RANDOM_IMAGES_URL);

    return results;
  };
}
