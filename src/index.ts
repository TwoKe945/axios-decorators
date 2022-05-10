import { AxiosRequestConfig } from 'axios';
import type {  
  UrlParam,
  RequestDecorator,
  HttpDecorators,
} from './type';


export const useHttpDecorators: HttpDecorators = (axios) => {

  type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

  function hasMethod(method: Method, ...methods: Method[]) {
    return methods.includes(method)
  }

  const createRequestDecorator = (url: UrlParam, method: Method, config: AxiosRequestConfig)=>{
    return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
      descriptor.value = (...args: any[]) => {
        config.method = method;
        let data = null;

        if (typeof url === 'function' && args.length >= 1 && args.length <= 2) {
          config.url =  url(args[0]);
          if (args.length === 2) {
            data = args[1];
          }
        } else if(typeof url === 'string') {
          config.url = url;
          if (args.length === 1) {
            data = args[0];
          }
        }

        if(hasMethod(method, 'DELETE', 'GET') && data !== null) {
          config.params = data;
        } else if (hasMethod(method, 'POST', 'PUT') && data !== null) {
          config.data = data;
        }

        return axios(config);
      }
    }
  }


  const GET: RequestDecorator = (url, config = {}) => {
    return createRequestDecorator(url, 'GET', config);
  };
  const POST: RequestDecorator = (url, config = {}) => {
    return createRequestDecorator(url, 'POST', config);
  };
  const DELETE: RequestDecorator = (url, config = {}) => {
    return createRequestDecorator(url, 'DELETE', config);
  };
  const PUT: RequestDecorator = (url, config = {}) => {
    return createRequestDecorator(url, 'PUT', config);
  };

  return {
    GET,
    POST,
    DELETE,
    PUT,
    defaultResult: <T>() => null as unknown as Promise<T>
  }
}
