import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './country/country';
import regionReducer from './region/region';

const store = configureStore({
  reducer: {
    country: countryReducer,
    region: regionReducer,
  },
});

export default store;
