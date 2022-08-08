import axios from 'axios';
import { FetchFetchPizzaPizza } from '../redux/actions/pizzaActions';
import { ProductType } from '../redux/slices/pizzaSlice';
const url = 'https://62bab20f573ca8f832893092.mockapi.io';

export const getProducts = (params: FetchFetchPizzaPizza) => {
    return axios.get<ProductType[]>(url + '/products', {
        params,
    });
};
