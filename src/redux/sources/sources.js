import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Actions
const FETCH_CARBON_SOURCE = 'capstone_3/sources/FETCH_CARBON_SOURCE';

// URL

// Async function (Function Action Creator)
const fetchSrcAsync = createAsyncThunk(
  FETCH_CARBON_SOURCE,
  async (id) => {
    const singleRegionURL = `https://api.carbonintensity.org.uk/regional/regionid/${id}`;
    const response = await fetch(singleRegionURL);
    const output = await response.json();
    const regionRaw = output.data[0];
    const region = {
      id: regionRaw.regionid,
      name: regionRaw.shortname,
      forecast: regionRaw.data[0].intensity.forecast,
      intensity: regionRaw.data[0].intensity.index,
      sources: regionRaw.data[0].generationmix,
    };

    return region;
  },
);

const initialState = {};

// Reducer
const sourceSlice = createSlice({
  name: 'sources',
  initialState,
  extraReducers: {
    [fetchSrcAsync.fulfilled]: (state, action) => (
      { ...state, ...action.payload }
    ),
  },
});

export { fetchSrcAsync };

export default sourceSlice.reducer;
