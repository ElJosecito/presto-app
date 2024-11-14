import axios from '../libs/axios';


// get user by id
export const getUserById = async (id) => {
    try {
        const response = await axios.get(`/user/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};


export const addClient = async (id, client) => {
    try {
        const response = await axios.post(`users/${id}/clients/create`, client);
        return response;
    } catch (error) {
        return error.response;
    }
};


