import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SortType = {
    type: string;
    direction: string;
};

interface FilterSlice {
    categoryIndex: number;
    chosenSort: SortType;
    searchValue: string;
    pageIndex: number;
}

const initialState: FilterSlice = {
    categoryIndex: 0,
    chosenSort: {
        type: 'rating',
        direction: 'desc',
    },
    searchValue: '',
    pageIndex: 0,
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryIndex(state, action: PayloadAction<number>) {
            state.categoryIndex = action.payload;
            state.searchValue = '';
            state.pageIndex = 0;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload.toString();
        },
        setChosenSort(state, action: PayloadAction<SortType>) {
            state.chosenSort = action.payload;
        },
        setPageIndex(state, action: PayloadAction<number>) {
            state.pageIndex = action.payload;
        },
        setFilters(state, action: PayloadAction<Record<string, string>>) {
            state.categoryIndex = Number(action.payload.categoryIndex);
            state.pageIndex = Number(action.payload.pageIndex);
            state.chosenSort.type = action.payload.type;
            state.chosenSort.direction = action.payload.direction;
        },
    },
});

export const { setCategoryIndex, setSearchValue, setChosenSort, setPageIndex, setFilters } =
    filterSlice.actions;

export default filterSlice.reducer;
