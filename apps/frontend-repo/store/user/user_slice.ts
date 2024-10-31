import { GetUserData } from '@ebuddy-technical-test/shared-types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: null | {
    id: string;
    email: string;
    displayName: string | null;
    emailVerified: boolean;
    phoneNumber: string | null;
    photoURL: string | null;
  };
  loading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
  errorMessage: null,
  successMessage: null,
  isSuccess: false,
  isError: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<GetUserData>) => ({
      ...state,
      user: {
        id: action.payload?.id || '',
        displayName: action.payload?.displayName || '',
        email: action.payload?.email || '',
        emailVerified: action.payload?.emailVerified || false,
        phoneNumber: action.payload?.phoneNumber || null,
        photoURL: action.payload?.photoURL || null
      },
      error: null
    }),
    logout: () => ({
      ...initialState
    }),
    setLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loading: action.payload
    }),
    setError: (state, action: PayloadAction<string | null>) => ({
      ...state,
      errorMessage: action.payload,
      isError: true,
      loading: false
    }),
    setSuccess: (state, action: PayloadAction<string | null>) => ({
      ...state,
      successMessage: action.payload,
      isSuccess: true,
      loading: false,
      errorMessage: null,
      isError: false
    }),
    clearMessages: (state) => ({
      ...state,
      errorMessage: null,
      successMessage: null,
      isError: false,
      isSuccess: false
    })
  }
});

// export const {
//   setUser,
//   logout,
//   setLoading,
//   setError,
//   setSuccess,
//   clearMessages
// } = userSlice.actions;

export type UserSlice = {
  [userSlice.name]: ReturnType<(typeof userSlice)['reducer']>;
};

export const userSelectors = userSlice.getSelectors<UserSlice>(
  (state) => state[userSlice.name]
);
