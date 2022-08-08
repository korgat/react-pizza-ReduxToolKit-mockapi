import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItemProduct = {
    title: string;
    price: number;
    imageUrl: string;
    size: number;
    type: string;
    id: number;
    count: number;
};

export type CartItem = {
    itemsPrice: number;
    itemsAmount: number;
    id: number;
    sizes: number[];
    [key: number]: CartItemProduct;
};

interface CartSlice {
    totalPrice: number;
    totalAmount: number;
    items: CartItem[];
}

const initialState: CartSlice = {
    totalPrice: 0,
    totalAmount: 0,
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItemProduct>) {
            const itemInCart = state.items.find((obj) => obj.id === action.payload.id);

            if (itemInCart && itemInCart[action.payload.size]) {
                itemInCart.itemsPrice += itemInCart[action.payload.size].price;
                ++itemInCart[action.payload.size].count;
                ++itemInCart.itemsAmount;
                ++state.totalAmount;
                state.totalPrice += itemInCart[action.payload.size].price;
            } else if (itemInCart) {
                const item = {
                    title: action.payload.title,
                    price: action.payload.price,
                    imageUrl: action.payload.imageUrl,
                    size: action.payload.size,
                    type: action.payload.type,
                    id: action.payload.id,
                    count: 1,
                };

                itemInCart[action.payload.size] = item;
                itemInCart.itemsPrice =
                    itemInCart.itemsPrice + itemInCart[action.payload.size].price;
                itemInCart.sizes.push(action.payload.size);
                ++itemInCart.itemsAmount;
                ++state.totalAmount;
                state.totalPrice += itemInCart[action.payload.size].price;
            } else {
                const item = {
                    title: action.payload.title,
                    price: action.payload.price,
                    imageUrl: action.payload.imageUrl,
                    size: action.payload.size,
                    type: action.payload.type,
                    id: action.payload.id,
                    count: 1,
                };
                state.items.push({
                    [action.payload.size]: item,
                    itemsPrice: action.payload.price,
                    itemsAmount: 1,
                    id: action.payload.id,
                    sizes: [action.payload.size],
                });
                ++state.totalAmount;
                state.totalPrice += action.payload.price;
            }
        },
        removeItem(
            state,
            action: PayloadAction<{
                size: number;
                id: number;
            }>,
        ) {
            const itemInCart = state.items.find((obj) => obj.id === action.payload.id);

            if (itemInCart && itemInCart.itemsAmount === 1) {
                state.items = state.items.filter((obj) => obj.id !== action.payload.id);
                state.totalPrice -= itemInCart[action.payload.size].price;
                --state.totalAmount;
            } else if (itemInCart && itemInCart[action.payload.size].count === 1) {
                itemInCart.sizes = itemInCart.sizes.filter((item) => item !== action.payload.size);
                --itemInCart.itemsAmount;
                itemInCart.itemsPrice -= itemInCart[action.payload.size].price;
                state.totalPrice -= itemInCart[action.payload.size].price;
                --state.totalAmount;
                delete itemInCart[action.payload.size];
            } else if (itemInCart) {
                --itemInCart[action.payload.size].count;
                --itemInCart.itemsAmount;
                itemInCart.itemsPrice -= itemInCart[action.payload.size].price;
                state.totalPrice -= itemInCart[action.payload.size].price;
                --state.totalAmount;
            }
        },
        deleteStack(state, action: PayloadAction<number>) {
            const itemInCart = state.items.find((obj) => obj.id === action.payload);

            if (itemInCart) {
                state.totalAmount -= itemInCart.itemsAmount;
                state.totalPrice -= itemInCart.itemsPrice;
                state.items = state.items.filter((obj) => obj.id !== action.payload);
            }
        },
        clearCart(state) {
            state.totalAmount = 0;
            state.totalPrice = 0;
            state.items = [];
        },
    },
});

export const { addItem, removeItem, deleteStack, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
