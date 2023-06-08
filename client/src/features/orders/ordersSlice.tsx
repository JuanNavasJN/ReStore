import agent from '@/app/api/agent';
import { Order } from '@/app/models/order';
import { ShippingAddress } from '@/app/models/order';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const createOrderAsync = createAsyncThunk<
  number,
  { saveAddress: boolean; shippingAddress: ShippingAddress }
>(
  'order/createOrderAsync',
  async ({ saveAddress, shippingAddress }, thunkAPI) => {
    try {
      return await agent.Orders.create({
        saveAddress,
        shippingAddress
      });
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchOrderAsync = createAsyncThunk<Order, number>(
  'order/fetchOrderAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.Orders.fetch(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchOrdersAsync = createAsyncThunk<Order[]>(
  'order/fetchOrdersAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Orders.list();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

interface OrdersState {
  orders: Order[] | null;
  order: Order | null;
  status: string;
  newOrderId?: number;
}

const initialState: OrdersState = {
  orders: null,
  order: null,
  status: 'idle'
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // -- createOrder --
    builder.addCase(createOrderAsync.pending, state => {
      state.status = 'pendingCreateOrder';
    });
    builder.addCase(createOrderAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.newOrderId = action.payload;
    });
    builder.addCase(createOrderAsync.rejected, (state, action) => {
      console.error(action.payload);
      state.status = 'idle';
    });

    // -- fetchOrder by Id --
    builder.addCase(fetchOrderAsync.pending, state => {
      state.status = 'pendingFetchOrder';
    });
    builder.addCase(fetchOrderAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.order = action.payload;
    });
    builder.addCase(fetchOrderAsync.rejected, (state, action) => {
      console.error(action.payload);
      state.status = 'idle';
    });

    // -- fetchOrders --
    builder.addCase(fetchOrdersAsync.pending, state => {
      state.status = 'pendingFetchOrders';
    });
    builder.addCase(fetchOrdersAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.orders = action.payload;
    });
    builder.addCase(fetchOrdersAsync.rejected, (state, action) => {
      console.error(action.payload);
      state.status = 'idle';
    });
  }
});
