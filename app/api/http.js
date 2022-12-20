import Axios from '../services/axios';

export async function post(url, payload, headers = null) {
    const axios = Axios();
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    if(headers) {
        config.headers = headers;
    }

    return axios.post(url, payload, config);
}

export async function httpResponseWrapper(callback) {
    try {

        const {data: response} = await callback();

        if(!parseInt(response.status)) {
            throw new Error(response.message);
        }

        return response;
        
    } catch (error) {
        throw error;
    }
}