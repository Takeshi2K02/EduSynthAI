// themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dark: localStorage.getItem('theme') === 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.dark = !state.dark;
      localStorage.setItem('theme', state.dark ? 'dark' : 'light');
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;