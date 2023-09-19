const HOME_PATHNAME = {
  GET_IMAGES_URL: '',
};

import API from './api';

class HomeService {
  getImages = async () => {
    const results = await API.get(HOME_PATHNAME.GET_IMAGES_URL);

    return results;
  };
}
