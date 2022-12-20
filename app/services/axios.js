import defu from 'defu';
import axios from 'axios';

const isDev = process.env.NODE_ENV !== 'production';

const createAxiosInstance = (c = {}) => {

    const config = defu(
        c,
        {
            debug: isDev,
            baseURL: process.env.NEXT_PUBLIC_BASE_URL,
            headers: {
                'crossDomain'                : true,
                'Accept'                     : 'application/json',
                'X-Requested-With'           : 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control'              : 'no-cache',
                // 'markettag'                  : process.env.NEXT_PUBLIC_MARKET_TAG
            }
        }
    );

    const axiosInstance = axios.create(config);
    axiosInstance.defaults.headers.post['Content-Type'] = 'multipart/form-data';

    axiosInstance.interceptors.response.use((response) => {
        if (c.debug) {
          console.log(`%c Response Of >>> /${response.config.url} <<<`, 'background: #515154; color: #f3f3f3; font-size: smaller; padding: 5px;');
          console.log(response.data);
        }
        return Promise.resolve(response);
      }, (error) => {
        if (c.debug) {
          if (error.response) {
            console.log(`%c Error Response For >>> /${error.response.config.url} <<<`, 'background: #515154; color: #ff0000; font-size: smaller; padding: 5px;');
            if (error.response.data && error.response.data.message)
              console.error(`Error Message :: ${error.response.data.message}`);

            console.log(error.response);
          }
          else {
            console.log(`%c Error Response For >>> /${error.response?.config?.url} <<<`, 'background: #515154; color: #ff0000; font-size: smaller; padding: 5px;');
            console.log(`Error Message :: ${error.message}`);
            if (axios.isCancel(error)) {
              return new Promise(() => {
              });
            }
          }
        }
        return Promise.reject(error);
    });

    return axiosInstance;


}

export default createAxiosInstance;
