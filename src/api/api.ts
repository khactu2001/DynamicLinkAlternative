import axios, {AxiosRequestConfig} from 'axios';
import {Alert} from 'react-native';
import Config from 'react-native-config';

const {BASE_URL, ACCESS_KEY} = Config;

type TParams = AxiosRequestConfig & {
  [key: string]: string | number | boolean;
};
class AxiosService {
  private requestConfig = async (props: AxiosRequestConfig) => {
    try {
      props.headers = {};
      props.headers.Authorization = `Client-ID ${ACCESS_KEY}`;

      const result = await axios.request(props);
      // const baseResponse: AxiosResponse = result;
      const data = result.data;
      return data;
    } catch (error) {
      // handle error here
      Alert.alert(error?.message ?? 'Something went wrong');
      if (error?.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
      return null;
    }
  };

  get = (pathname: string, params?: TParams) => {
    return this.requestConfig({
      url: BASE_URL + pathname,
      params,
    });
  };
}

// create an instance
export const axiosService = new AxiosService();
