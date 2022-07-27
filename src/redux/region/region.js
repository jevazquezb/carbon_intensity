import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Actions
const FETCH_CARBON_SOURCE = 'capstone_3/region/FETCH_CARBON_SOURCE';

// URL
const regionURL = 'https://api.carbonintensity.org.uk/regional';

// Async function (Function Action Creator)
const fetchSrcAsync = createAsyncThunk(
  FETCH_CARBON_SOURCE,
  async () => {
    const response = await fetch(regionURL);
    const output = await response.json();
    const regionsRaw = output.data[0].regions;

    const regions = regionsRaw.map((region) => ({
      id: region.regionid,
      name: region.shortname,
      intensity: region.intensity,
      sources: region.generationmix,
    }));

    return regions;
  },
);

const initialState = [];

// Reducer
const regionSlice = createSlice({
  name: 'intensity',
  initialState,
  extraReducers: {
    [fetchSrcAsync.fulfilled]: (state, action) => (
      [...action.payload]
    ),
  },
});

export { fetchSrcAsync };

export default regionSlice.reducer;
