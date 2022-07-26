import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './country/country';

const store = configureStore({
  reducer: {
    country: countryReducer,
  },
});

export default store;
