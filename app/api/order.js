import Axios from "../services/axios";
import {data} from "autoprefixer";

export const placeOrder = async (url = '', payload) => {
    try {

        const axios = Axios();

        const {data: response} = await axios.post(url, payload);
        if(!parseInt(response.status)) {
            throw new Error(response.message);
        }

        return response;

    } catch(error) {

        throw error;

    }
}

export const fetchOrder = (url = 'GetReceipts') => {
    try {
        const axios = Axios();
        // axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('accessToken') ?? null;
        axios.defaults.headers.common['Authorization'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySWQiOjEzMSwiVXNlckRldmljZUlkIjowLCJDb21wYW55SWQiOjAsIkNvbXBhbnlPd25lcklkIjowLCJSZWdpc3RlcklkIjowLCJTaGlmdElkIjowLCJTZXNzaW9uSGlzdG9yeUlkIjowLCJUWiI6IiJ9.XfuhQbIX7Gxb3Sh2kSRix-osqm7DhZteHzeLXB2B-D0'
        return axios.get(`OrderApp/${url}`);
    }catch (error) {
        throw error;
    }
}

export const fetchCurrentOrder = (url = 'GetCurrentOrder') => {
    try {
        const axios = Axios();
        axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('accessToken') ?? null;
        axios.defaults.headers.common['Authorization'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySWQiOjEzMSwiVXNlckRldmljZUlkIjowLCJDb21wYW55SWQiOjAsIkNvbXBhbnlPd25lcklkIjowLCJSZWdpc3RlcklkIjowLCJTaGlmdElkIjowLCJTZXNzaW9uSGlzdG9yeUlkIjowLCJUWiI6IiJ9.XfuhQbIX7Gxb3Sh2kSRix-osqm7DhZteHzeLXB2B-D0'
        return axios.get(`OrderApp/${url}`);
    }catch (error) {
        throw error;
    }
}

export const fetchOrderDetails = (id = 371) => {
    try {
        const axios = Axios();
        axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('accessToken') ?? null;
        axios.defaults.headers.common['Authorization'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySWQiOjEzMSwiVXNlckRldmljZUlkIjowLCJDb21wYW55SWQiOjAsIkNvbXBhbnlPd25lcklkIjowLCJSZWdpc3RlcklkIjowLCJTaGlmdElkIjowLCJTZXNzaW9uSGlzdG9yeUlkIjowLCJUWiI6IiJ9.XfuhQbIX7Gxb3Sh2kSRix-osqm7DhZteHzeLXB2B-D0'
        return axios.get(`orderapp/GetOrderDetail/${id}`);
    }catch (error) {
        throw error;
    }
}
