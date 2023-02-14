import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status: 'loading'
}

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
    const {currentPage, filter, search} = params
    const {data} = await axios.get(
        `https://63dc382dc45e08a04356e0d4.mockapi.io/items?page=${currentPage}&limit=4&${filter.categoryId > 0 ? `category=${filter.categoryId}` : ''}&sortBy=${filter.sort.sortProperty}&order=${filter.sort.orderType}${search}`
    )
    return data
})

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchPizzas.rejected]: (state, action) => {
            state.status = 'error'
            state.items = []
        },
    }
})

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer