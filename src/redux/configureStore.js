import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './country/country';
import regionReducer from './region/region';
import intensityReducer from './intensities/intensities';
import sourceReducer from './sources/sources';

const store = configureStore({
  reducer: {
    country: countryReducer,
    region: regionReducer,
    intensities: intensityReducer,
    sources: sourceReducer,
  },
});

export default store;
