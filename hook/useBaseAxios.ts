import { useEffect, useRef, useCallback } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import useAxiosReducer, { RequestState } from './useAxiosReducer';
import useAxiosCancel from './useAxiosCancel';

interface RequestFunctions {
  cancel: () => void;
  refetch: () => Promise<void>;
}

export interface Config<Data> extends AxiosRequestConfig {
  axiosInstance?: AxiosInstance;
  ssrData?: Data;
}

export type Props<Data> = RequestState<Data> & RequestFunctions;
export type BaseAxios<Data> = [(lazyData?: Config<Data>['data']) => Promise<void>, Props<Data>];

function useBaseAxios<Data>(url: string): BaseAxios<Data>;
function useBaseAxios<Data>(config: Config<Data>): BaseAxios<Data>;
function useBaseAxios<Data>(url: string, config: Config<Data>): BaseAxios<Data>;
function useBaseAxios<Data>(param1: string | Config<Data>, param2: Config<Data> = {}) {
  const isMounted = useRef(true);
  const [{ data, error, loading }, dispatch] = useAxiosReducer<Data>(
    typeof param1 === 'string' ? param2.ssrData : param1.ssrData
  );
  const { cancel, cancelToken } = useAxiosCancel();

  const createAxiosInvoker = () => {
    if (typeof param1 === 'string') {
      const { axiosInstance = axios, ...config } = param2;

      return (lazyData: Config<Data>['data']) =>
        axiosInstance(param1, {
          ...config,
          data: lazyData || param2.data,
          cancelToken,
        });
    }

    const { axiosInstance = axios, ...config } = param1;

    return (lazyData: Config<Data>['data']) =>
      axiosInstance({
        ...config,
        data: lazyData || param1.data,
        cancelToken,
      });
  };

  const invokeAxios = createAxiosInvoker();

  const getData = useCallback(
    async (lazyData: Config<Data>['data']) => {
      dispatch({ type: 'REQUEST_INIT' });

      try {
        const res = (await invokeAxios(lazyData)) as AxiosResponse<Data>;

        if (isMounted.current) {
          dispatch({ type: 'REQUEST_SUCCESS', payload: res.data });
        }
      } catch (e:any) {
        if (isMounted.current) {
          dispatch({ type: 'REQUEST_FAILED', payload: e });
        }
      }
    },
    [cancelToken, `${JSON.stringify(param1)}.${JSON.stringify(param2)}`]
  );

  useEffect(() => {
    return () => {
      cancel();
      isMounted.current = false;
    };
  }, []);

  return [getData, { cancel, data, error, loading, refetch: getData }];
}

export default useBaseAxios;