import { createSlice } from '@reduxjs/toolkit';
import { fetchPizzas } from '../actions/pizzaActions';

export type ProductType = {
    id: number;
    title: string;
    prices: number[];
    imageUrl: string;
    sizes: number[];
    types: number[];
};

interface PizzaSlice {
    totalAmount: number;
    products: ProductType[];
    status: Status;
}

export enum Status {
    PENDING = 'loading',
    FULFILLED = 'success',
    REJECTED = 'error',
}

const initialState: PizzaSlice = {
    totalAmount: 0,
    products: [],
    status: Status.PENDING,
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.products = [];
            state.status = Status.PENDING;
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.products = action.payload.products;
            state.totalAmount = action.payload.totalAmount;
            state.status = Status.FULFILLED;
        });
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            console.log(action.error.name, action.type);
            state.products = [];
            state.totalAmount = 0;
            state.status = Status.REJECTED;
        });
    },
});

export default pizzaSlice.reducer;
