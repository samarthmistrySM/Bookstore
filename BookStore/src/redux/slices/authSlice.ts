import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const API_URL = 'http://localhost:3000/api/v1';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData: {email: string; password: string}, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    userData: {
      email: string;
      password: string;
      fullName: string;
      phoneNumber: number;
    },
    {rejectWithValue},
  ) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (_, {rejectWithValue}) => {
    try {
      await GoogleSignin.hasPlayServices();
      // @ts-ignore
      const userInfo = await GoogleSignin.signIn();

      const response = await axios.post(`${API_URL}/users/google-login`, {
        userData: userInfo.data?.user,
      });

      return response.data;
    } catch (error) {
      // @ts-ignore
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return rejectWithValue('Google Sign-In Cancelled');
      } else {
        // @ts-ignore
        if (error.code === statusCodes.IN_PROGRESS) {
          return rejectWithValue('Google Sign-In in Progress');
        } else {
          // @ts-ignore
          if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            return rejectWithValue('Play Services Not Available');
          } else {
            return rejectWithValue(
              // @ts-ignore
              error.response?.data || 'Google Sign-In Failed',
            );
          }
        }
      }
    }
  },
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await axios.get(`${API_URL}/users`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response?.data || 'Failed to load user');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    loading: false,
    error: null,
    user: null,
    reload: false,
  },
  reducers: {
    logout: state => {
      state.token = null;
      state.user = null;
      AsyncStorage.removeItem('token');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.reload = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.data;
        AsyncStorage.setItem('token', action.payload.data);
        state.reload = false;
      })
      .addCase(loginUser.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
        state.reload = false;
      })

      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
        state.reload = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.data;
        AsyncStorage.setItem('token', action.payload.data);
        state.reload = false;
      })
      .addCase(registerUser.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
        state.reload = false;
      })

      .addCase(loginWithGoogle.pending, state => {
        state.loading = true;
        state.error = null;
        state.reload = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.data;
         AsyncStorage.setItem('token', action.payload.data);
        state.reload = false;
      })
      .addCase(loginWithGoogle.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
        state.reload = false;
      })

      .addCase(fetchUser.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(fetchUser.rejected, state => {
        state.loading = false;
        state.user = null;
      });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
