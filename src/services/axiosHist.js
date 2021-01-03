import axios from 'axios';
import { BASE_URL } from './constants';

const axiosAPI = axios.create({
    baseURL: `${BASE_URL}api/`,
    responseType: 'json'
});

export const fetchHistoricalData = (successHandler, errorHandler) => {
    return axiosAPI.request({
        url: 'historical',
        method: 'GET',
    }).then((xhrResponse) => {
        const response = xhrResponse.data;
        successHandler(response);
    }).catch((xhrResponse) => {
        const response = xhrResponse.data;
        const error = (response && response.message) || 'Failed to fetch historical data. API failure.';
        errorHandler(error);
    });
}

