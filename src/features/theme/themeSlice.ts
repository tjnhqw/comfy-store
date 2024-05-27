import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { applyThem } from '~/utils';

export type Theme = 'dark' | 'light' | 'system';

type ThemeState = {
	theme: Theme;
};

const initializeTheme = (): Theme => {
	const theme = (localStorage.getItem('theme') as Theme) || 'system';
	applyThem(theme);
	return theme;
};

const initialState: ThemeState = {
	theme: initializeTheme(),
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme: (state, action: PayloadAction<Theme>) => {
			state.theme = action.payload;
			applyThem(action.payload);
			localStorage.setItem('theme', action.payload);
		},
	},
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
