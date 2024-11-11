import axios from '../libs/axios';

export const login = async (email, password) => {
    try {
        const response = (await axios.post('/auth/login', { email, password }));
        return response;
    } catch (error) {
        return error.response;
    }
};


export const register = async (email, password, firstName, lastName, phoneNumber) => {
    try {
        const response = await axios.post('/auth/register', { email, password, firstName, lastName, phoneNumber });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};