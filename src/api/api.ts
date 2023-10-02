import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosHeaders, AxiosRequestConfig} from 'axios';
import {Alert} from 'react-native';
import {ListImages} from '~models/image-model';
import Config from 'react-native-config';

// const BASE_URL = process.env.API_IMAGES;
// const CLIENT_ID = process.env.CLIENT_ID;
// const ACCESS_KEY = process.env.ACCESS_KEY;

const {BASE_URL, ACCESS_KEY} = Config;
// const ACCESS_KEY = '4tNBFTHNRJGTfp5GomITIsfgoMktNh0Lu8wRAyBnyWA';

type TParams = AxiosRequestConfig & {
  [key: string]: string | number | boolean;
};
export default class AxiosService {
  private requestConfig = async (props: AxiosRequestConfig) => {
    try {
      props.headers = {};
      props.headers.Authorization = `Client-ID ${ACCESS_KEY}`;

      const result = await axios.request(props);
      const data: ListImages = result.data;
      return data;
    } catch (error) {
      // handle error here
      Alert.alert(error.message);
      if (error.response) {
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
    }
  };

  get = (pathname: string, params?: TParams) => {
    return this.requestConfig({
      url: BASE_URL + pathname,
      params,
    });
  };
}
