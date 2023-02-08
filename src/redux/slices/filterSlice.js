import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'rating',
        orderType: 'asc',
    }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setMethodType(state, action) {
            state.sort.orderType = action.payload
        },
        setSort(state, action) {
            state.sort = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        }
    }
})

export const {setCategoryId, setMethodType, setSort, setCurrentPage} = filterSlice.actions

export default filterSlice.reducer