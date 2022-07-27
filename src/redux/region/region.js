import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Actions
const FETCH_REGION_INTENSITY = 'capstone_3/region/FETCH_REGION_INTENSITY';

// URL
const regionURL = 'https://api.carbonintensity.org.uk/regional';

// Async function (Function Action Creator)
const fetchIntAsync = createAsyncThunk(
  FETCH_REGION_INTENSITY,
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
    [fetchIntAsync.fulfilled]: (state, action) => (
      [...action.payload]
    ),
  },
});

export { fetchIntAsync };

export default regionSlice.reducer;
