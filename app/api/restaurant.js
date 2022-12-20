import Axios from '../services/axios';

export const  fetchRestaurantList = async () => {

    try {

        const axios = Axios();

        const {data: response} = await axios.get('orderapp/GetRestaurants');

        if(!parseInt(response.status)) {
            throw new Error(response.message);
        }

        return response;

    } catch(error) {

        throw error;

    }

}
