import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Actions
const FETCH_CARBON_SOURCE = 'capstone_3/sources/FETCH_CARBON_SOURCE';

// Async function (Function Action Creator)
const fetchCarbonAsync = createAsyncThunk(
  FETCH_CARBON_SOURCE,
  async (id) => {
    const singleRegionURL = `https://api.carbonintensity.org.uk/regional/regionid/${id}`;
    const response = await fetch(singleRegionURL);
    const output = await response.json();
    const regionRaw = output.data[0];
    const regionSrc = regionRaw.data[0].generationmix;
    return regionSrc;
  },
);

const initialState = [];

// Reducer
const sourceSlice = createSlice({
  name: 'sources',
  initialState,
  extraReducers: {
    [fetchCarbonAsync.fulfilled]: (state, action) => (
      [...action.payload]
    ),
  },
});

export { fetchCarbonAsync };

export default sourceSlice.reducer;
