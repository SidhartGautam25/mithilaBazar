import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';


interface User{
    [key: string]: any;
}

interface UserState{
    user: User | null;
    loading: boolean;
    error: string | null;
    success: boolean | null;
    isAuthenticated: boolean;
    message: string | null;
}

interface ApiResponse{
    success?: boolean;
    user?: User;
    message?: string;
    statusCode?: number;
}

interface LoginCredentials{
    email: string;
    password: string;
}

interface ResetPasswordData{
    token: string;
    userData: any;
}

interface ApiError{
    message?: string;
    statusCode?: number;
}

export const register = createAsyncThunk<ApiResponse, FormData, { rejectValue: ApiError }>('user/register', async (userData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        const { data } = await axios.post('/api/v1/register', userData, config);
        return data;
        
    } catch (err) {
        const axiosError = err as AxiosError<ApiError>;
        return rejectWithValue(axiosError.response?.data || { message: 'Registration failed. Try again' })
        
    }
});

export const login = createAsyncThunk<ApiResponse, LoginCredentials, { rejectValue: ApiError }>('user/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.post('/api/v1/login', { email, password }, config);
        return data;
    } catch (err) {
        const axiosError = err as AxiosError<ApiError>;
        return rejectWithValue(axiosError.response?.data || { message: 'Login Failed' })
    }
});

export const loadUser = createAsyncThunk<ApiResponse, void, { rejectValue: ApiError }>(
    'user/loadUser', async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/api/v1/profile');
            return data;
            
        } catch (err) {
            const axiosError = err as AxiosError<ApiError>;
            return rejectWithValue(axiosError.response?.data || { message: 'failed to load user data' });
            
        }
    }
)

export const logout = createAsyncThunk<ApiResponse, void, { rejectValue: ApiError }>(
    'user/logout', async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/api/v1/logout', { withCredentials: true });
            return data;
            
        } catch (err) {
            const axiosError = err as AxiosError<ApiError>;
            return rejectWithValue(axiosError.response?.data || {message:'Logout failed. try again'})
            
        }
    }
)


export const updateProfile = createAsyncThunk<ApiResponse, FormData, { rejectValue: ApiError }>(
    'user/updateProfile', async (userData, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            const { data } = await axios.put('/api/v1/profile/update ', userData, config);
            return data;
            
        } catch (err) {
            const axiosError = err as AxiosError<ApiError>;
            return rejectWithValue(axiosError.response?.data || {message:'failed to update the profile'})
            
        }
    }
)


export const updatePassword = createAsyncThunk<ApiResponse, any, { rejectValue: ApiError }>(
    'user/updatePassword',
    async (formData, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const { data } = await axios.put('/api/v1/password/update', formData, config);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiError>;
        return rejectWithValue(axiosError.response?.data || { message: 'Password update failed' });
      }
    }
);
  
export const forgotPassword = createAsyncThunk<ApiResponse, any, { rejectValue: ApiError }>(
    'user/forgotPassword',
    async (email, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const { data } = await axios.post('/api/v1/password/forgot', email, config);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiError>;
        return rejectWithValue(axiosError.response?.data || { message: 'Email sent Failed' });
      }
    }
);
  
export const resetPassword = createAsyncThunk<ApiResponse, ResetPasswordData, { rejectValue: ApiError }>(
    'user/resetPassword',
    async ({ token, userData }, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const { data } = await axios.post(`/api/v1/reset/${token}`, userData, config);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiError>;
        return rejectWithValue(axiosError.response?.data || { message: 'Email sent Failed' });
      }
    }
);
  

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
        loading: false,
        error: null,
        success: false,
        isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
        message:null
    } as UserState,
    reducers: {
        removeErrors: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = null;
        }
    },
    extraReducers: (builder) => {
        // registration cases
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(register.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
                state.loading = false;
                state.error = null;
                state.success = action.payload.success || false;
                state.user = action.payload?.user || null;
                state.isAuthenticated = Boolean(action.payload?.user);

                // storing in local cases
                localStorage.setItem('user', JSON.stringify(state.user));
                localStorage.setItem('isAuthenticated',JSON.stringify(state.isAuthenticated))
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'registration failed';
                state.user = null;
                state.isAuthenticated = false;
            })
        // login cases
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
                state.loading = false;
                state.error = null;
                state.success = action.payload.success || false;
                state.user = action.payload?.user || null;
                state.isAuthenticated = Boolean(action.payload?.user);

                // saving to local storage
                localStorage.setItem('user', JSON.stringify(state.user));
                localStorage.setItem('isAuthenticated',JSON.stringify(state.isAuthenticated))
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'login failed';
                state.user = null;
                state.isAuthenticated = false;

                if (action.payload?.statusCode === 401) {
                    state.user = null;
                    state.isAuthenticated = false;
                    localStorage.removeItem('user');
                    localStorage.removeItem('isAuthenticated');
                }

            })
         // Logout User
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
        state.loading = false;
        state.error = null;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to load user profile';
      })
          // Update User Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload?.user || null;
        state.success = action.payload?.success || false;
        state.message = action.payload?.message || null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Profile update failed. Please try again later';
      })
         // Update User Password
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload?.success || false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Password update failed';
      })
        
         // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload?.success || false;
        state.message = action.payload?.message || null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Email sent failed';
      })
         // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload?.success || false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Email sent failed';
      });
    }
})

export default userSlice.reducer;
export const { removeErrors, removeSuccess } = userSlice.actions;
