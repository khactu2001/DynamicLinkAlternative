import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {InternalAxiosRequestConfig} from 'axios';

const BASE_URL = process.env.API_IMAGES;
const CLIENT_ID = process.env.CLIENT_IDL;
// const instance = axios.create({
//   baseURL: BASE_URL,
//   timeout: 5000,
// });

class AxiosService {
  instance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
  });
}

// async function AxiosService() {
//   const instance = axios.create({
//     baseURL: BASE_URL,
//     timeout: 5000,
//   });

//   const accessToken = await AsyncStorage.getItem('accessToken');

//   if (accessToken) {
//     instance.interceptors.request.use(
//       (config: InternalAxiosRequestConfig<any>) => {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//         return config;
//       },
//       (error: any) => {
//         return Promise.reject(error);
//       },
//     );
//   }

//   // const {get, post, patch} = instance;
//   return instance;
//   // return {get, post, patch};
// }

// export default AxiosService;
