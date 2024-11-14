import axios from '../libs/axios';


// add payment to client

export const addPayment = async (id, paymentObject) => {
    try {
        const response = await axios.post(`clients/payment/${id}`, paymentObject);
        return response;
    } catch (error) {
        return error.response;
    }
};

// get Client by id
export const getClientById = async (id) => {
    try {
        const response = await axios.get(`clients/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};