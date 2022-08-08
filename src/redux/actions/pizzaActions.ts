import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts } from '../../API/productAPI';
import { SortType } from '../slices/filterSlice';
import { ProductType } from '../slices/pizzaSlice';

type FetchPizzaArgs = {
    searchValue: string;
    categoryIndex: number;
    chosenSort: SortType;
    pageIndex: number;
    itemsPerPage: number;
};

export type FetchFetchPizzaPizza = {
    sortBy?: string;
    order?: string;
    title?: string;
    category?: number;
    page?: number;
    limit?: number;
    id?: number;
};

export const fetchPizzas = createAsyncThunk<
    { totalAmount: number; products: ProductType[] },
    FetchPizzaArgs
>('pizza/fetchPizzasStatus', async (arg) => {
    const { searchValue, categoryIndex, chosenSort, pageIndex, itemsPerPage } = arg;
    const params: FetchFetchPizzaPizza = {
        sortBy: chosenSort.type,
        order: chosenSort.direction,
    };

    if (searchValue) {
        params.title = searchValue;
    }
    if (categoryIndex) {
        params.category = categoryIndex;
    }

    // mockAPi doesn't provide total amount for pagination (alternative)
    const totalAmount = getProducts(params);
    //

    params.page = pageIndex + 1;
    params.limit = itemsPerPage;

    const pizzas = getProducts(params);

    const responses = await Promise.all([totalAmount, pizzas]);
    const data = {
        totalAmount: responses[0].data.length,
        products: responses[1].data,
    };

    return data;
});
