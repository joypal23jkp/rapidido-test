import Axios from "../services/axios";

class User {
    axios = Axios();
    constructor() {
        if (typeof window !== 'undefined') {
            this.axios.defaults.headers.common['Authorization'] = localStorage.getItem('accessToken') ?? null;
        }
    }

    getProfile() {
        return this.axios.get('orderapp/GetProfile');
    }

    updateProfileImage(payload) {
        return this.axios.post('orderapp/PostUserImage', payload);
    }

    updateProfile(payload) {
        return this.axios.post('orderapp/UpdateProfile', payload);
    }
}

export default new User();
