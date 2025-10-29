import api from "@/lib/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface User {
  id: string;
  username: string;
  email: string;
}


export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    try {
      const res = await api.get("/me"); // api interceptor will refresh if needed
      return res.data.user;
    } catch (err: unknown) {
      // Narrow unknown type
      if (err instanceof Error) {
        throw new Error(err.message); 
      }
      
      // fallback for other shapes
      throw new Error("Failed to fetch user");
    }
});

interface UserState {
  data: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load user";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
