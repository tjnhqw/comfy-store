import { configureStore } from '@reduxjs/toolkit';

import userSlice from '~/features/user/userSlice';
import themeSlice from '~/features/theme/themeSlice';
import cartSlice from '~/features/cart/cartSlice';

const store = configureStore({
	reducer: {
		user: userSlice,
		theme: themeSlice,
		cart: cartSlice,
	},
	devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type ReduxStore = {
	getState: () => RootState;
	dispatch: AppDispatch;
};

export default store;
