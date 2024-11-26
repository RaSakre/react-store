import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICloth } from "./storeSlice";

interface IOrder {
	id: number;
	items: ICloth[];
	createdAt:string;
}

interface IResponse {
	id:string;
	data: IOrder;
}

type TOrderState = {
	userOrders: IResponse[];
}

const initialState:TOrderState = {
	userOrders: []
}

export const orderThunk = createAsyncThunk("orders", async (data:IOrder) => {
	const response = await fetch('http://localhost:3001/userOrders', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			data
		})
	})
	return response.json().then(data => data)
})

export const fetchUserOrders = createAsyncThunk(
	'orders/fetchUserOrders',
	async () => {
		const response = await fetch('http://localhost:3001/userOrders')
		return response.json().then(data => data)
	}
)

const ordersSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		addOrder: (state, action) => {
      state.userOrders.push(action.payload); // Добавляем новый заказ
    },
	},
	extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        
        console.error(action.error.message);
      });
  },
})

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
