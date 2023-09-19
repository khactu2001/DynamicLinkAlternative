import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosHeaders, AxiosRequestConfig} from 'axios';

const BASE_URL = process.env.API_IMAGES;
const CLIENT_ID = process.env.CLIENT_IDL;
// const instance = axios.create({
//   baseURL: BASE_URL,
//   timeout: 5000,
// });
const config = {
  baseURL: BASE_URL,
  timeout: 5000,
};

type TParams = {
  [key: string]: string;
};
export default class AxiosService {
  private requestConfig = async (props: AxiosRequestConfig) => {
    try {
      return await axios.request({
        ...props,
        baseURL: BASE_URL,
      });
    } catch (err) {
      // handle error here
      console.error(err);
    }
  };

  get = (pathname: string, headers?: AxiosHeaders, params?: TParams) => {
    return this.requestConfig({
      url: pathname,
      headers,
      params,
    });
  };
}
