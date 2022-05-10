import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

/**
 * 请求地址参数
 */
declare type UrlParam = string | (<T>(id: T) => string);
/**
 * 请求装饰器
 */
declare type RequestDecorator = (url: UrlParam, config?: AxiosRequestConfig) => MethodDecorator;
/**
 * 请求方法装饰器
 */
declare type HttpDecorators = (axios: AxiosInstance) => ({
    GET: RequestDecorator;
    DELETE: RequestDecorator;
    PUT: RequestDecorator;
    POST: RequestDecorator;
    defaultResult: <T extends any = AxiosResponse<any>>() => Promise<T>;
});

declare const useHttpDecorators: HttpDecorators;

export { useHttpDecorators };
