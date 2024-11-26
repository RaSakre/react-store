import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface ICloth {
	id:string;
	price:string;
	description:string;
	image:string;
}

interface IClothes {
	clothes: ICloth[],
	basketProducts: ICloth[],
}

export const fetchClothes = createAsyncThunk(
	'fetchClothes',
	async () => {
		const response = await fetch('http://localhost:3001/clothes')
		return response.json()
	}
)

export const fetchBasket = createAsyncThunk(
	'fetchBasket',
	async () => {
		const response = await fetch('http://localhost:3001/basket')
		return response.json()
	}
)

const initialState:IClothes = {
	clothes: [],
	basketProducts: [],
}

export const storeSlice = createSlice({
	name: 'storeSlice',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
		.addCase(fetchClothes.fulfilled, (state, action) => {
			state.clothes = action.payload
		})
		.addCase(fetchBasket.fulfilled, (state, action) => {
			state.basketProducts = action.payload
		})
	}
})


export default storeSlice.reducer