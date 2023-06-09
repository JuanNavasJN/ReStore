import agent from '@/app/api/agent';
import { User } from '@/app/models/user';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { FieldValues } from 'react-hook-form';
import Router from 'next/router';
import { toast } from 'react-toastify';
import { setBasket } from '../basket/basketSlice';

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null
};

export const signInUser = createAsyncThunk<User, FieldValues>(
  'account/signInUser',
  async (data, thunkAPI) => {
    try {
      const userDto = await agent.Account.login(data);
      const { basket, ...user } = userDto;
      if (basket) thunkAPI.dispatch(setBasket(basket));
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User>(
  'account/fetchCurrentUser',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
    try {
      const userDto = await agent.Account.currentUser();
      const { basket, ...user } = userDto;
      if (basket) thunkAPI.dispatch(setBasket(basket));
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data || error });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem('user')) return false;
    }
  }
);

export const forgotPassword = createAsyncThunk<undefined, FieldValues>(
  'account/forgotPassword',
  async (data, thunkAPI) => {
    try {
      await agent.Account.forgot(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data || error });
    }
  }
);

export const resetPassword = createAsyncThunk<undefined, FieldValues>(
  'account/resetPassword',
  async (data, thunkAPI) => {
    try {
      await agent.Account.reset(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data || error });
    }
  }
);

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    signOut: state => {
      state.user = null;
      localStorage.removeItem('user');
      Router.push('/');
    },
    setUser: (state, action) => {
      const claims = JSON.parse(
        Buffer.from(action.payload.token.split('.')[1], 'base64').toString()
      );
      const roles =
        claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      state.user = {
        ...action.payload,
        roles: typeof roles === 'string' ? [roles] : roles
      };
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchCurrentUser.rejected, state => {
      state.user = null;
      localStorage.removeItem('user');
      toast.error('Session expired - please login again');
      Router.push('/');
    });
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        const claims = JSON.parse(
          Buffer.from(action.payload.token.split('.')[1], 'base64').toString()
        );
        const roles =
          claims[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ];
        state.user = {
          ...action.payload,
          roles: typeof roles === 'string' ? [roles] : roles
        };
      }
    );
    builder.addMatcher(
      isAnyOf(
        signInUser.rejected,
        forgotPassword.rejected,
        resetPassword.rejected
      ),
      (state, action) => {
        throw action.payload;
      }
    );
  }
});

export const { signOut, setUser } = accountSlice.actions;
