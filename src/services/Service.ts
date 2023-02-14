import axios from 'axios';

export const invoice = 'http://localhost:8082/invoice/client';
export const product = 'http://localhost:8082/product/category';
export const detail = 'http://localhost:8082/detail/product';



export const fetch = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
};

export const createFetch = async (url: string, { arg }: any) => {
    const response = await axios.post(url, arg);
    return response.data;
};

export const updateFetch = async (url: string, { arg }: any) => {
    const response = await axios.patch(url, arg);
    return response.data;
};
