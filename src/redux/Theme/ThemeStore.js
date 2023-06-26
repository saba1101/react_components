import { createSlice } from "@reduxjs/toolkit";
import { GlobalTheme } from "@/utils/Theme";
export const ActionStore = createSlice({
  name: "ThemeStore",
  initialState: {
    Theme : GlobalTheme()._getCurrentTheme(),
  },
  reducers: {
    SetTheme : (state,action) => {
        state.Theme = action.payload
    }
  }
});

export const {
  SetTheme
} = ActionStore.actions;

export default ActionStore.reducer;
