import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './country/country';
import regionReducer from './region/region';
import sourceReducer from './sources/sources';

const store = configureStore({
  reducer: {
    country: countryReducer,
    region: regionReducer,
    sources: sourceReducer,
  },
});

export default store;
