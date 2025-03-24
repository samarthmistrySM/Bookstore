import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_URL = 'http://localhost:3000/api/v1';

export const fetchBooks = createAsyncThunk(
  'book/fetchBooks',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return rejectWithValue('No token found');

      const response = await axios.get(`${API_URL}/books`, {
        headers: {Authorization: `Bearer ${token}`},
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error fetching books');
    }
  },
);

export const wishlistBook = createAsyncThunk(
  'book/wishlist',
  async (bookId: string, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await axios.put(
        `${API_URL}/books/wishlist`, // Fix: Use `PUT` for updates
        {bookId},
        {headers: {Authorization: `Bearer ${token}`}},
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Error adding to wishlist',
      );
    }
  },
);

export const addToCart = createAsyncThunk(
  'book/addToCart',
  async (bookId: string, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await axios.put(
        `${API_URL}/books/addToCart`,
        {bookId},
        {headers: {Authorization: `Bearer ${token}`}},
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error adding to cart');
    }
  },
);

export const removeFromCart = createAsyncThunk(
  'book/removeFromCart',
  async (bookId: string, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await axios.put(
        `${API_URL}/books/removeFromCart`,
        {bookId},
        {headers: {Authorization: `Bearer ${token}`}},
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Error removing from cart',
      );
    }
  },
);

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBooks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload.data;
      })
      .addCase(fetchBooks.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(wishlistBook.pending, state => {
        state.loading = true;
      })
      .addCase(wishlistBook.fulfilled, state => {
        state.loading = false;
      })
      .addCase(wishlistBook.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToCart.pending, state => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, state => {
        state.loading = false;
      })
      .addCase(addToCart.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeFromCart.pending, state => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, state => {
        state.loading = false;
      })
      .addCase(removeFromCart.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dataSlice.reducer;
