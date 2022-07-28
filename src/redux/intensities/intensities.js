import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Actions
const FETCH_INT = 'capstone_3/sources/FETCH_INT';

// Async function (Function Action Creator)
const intAsync = createAsyncThunk(
  FETCH_INT,
  async (id) => {
    const singleRegionURL = `https://api.carbonintensity.org.uk/regional/regionid/${id}`;
    const response = await fetch(singleRegionURL);
    const output = await response.json();
    const regionRaw = output.data[0];
    const regionInt = {
      id: regionRaw.regionid,
      name: regionRaw.shortname,
      forecast: regionRaw.data[0].intensity.forecast,
      intensity: regionRaw.data[0].intensity.index,
    };
    return regionInt;
  },
);

const initialState = {};

// Reducer
const intensitySlice = createSlice({
  name: 'intensities',
  initialState,
  extraReducers: {
    [intAsync.fulfilled]: (state, action) => (
      { ...action.payload }
    ),
  },
});

export { intAsync };

export default intensitySlice.reducer;
