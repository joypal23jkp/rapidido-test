import Axios from '../services/axios';

export const findByCompanyId = async (companyId) => {

    try {

        const axios = Axios();

        const {data: response} = await axios.get(`orderapp/getmenu/${companyId}`);

        if(!parseInt(response.status)) {
            throw new Error(response.message);
        }

        return response;

    } catch(error) {

        throw error;

    }

}