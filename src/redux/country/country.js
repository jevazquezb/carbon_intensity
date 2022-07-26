import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Actions
const FETCH_NATIONAL_EMISSION = 'capstone_3/country/FETCH_NATIONAL_EMISSION';

// URL
const nationalURL = 'https://api.carbonintensity.org.uk/intensity';

// Async function (Function Action Creator)
const fetchNatEmAsync = createAsyncThunk(
  FETCH_NATIONAL_EMISSION,
  async () => {
    const response = await fetch(nationalURL);
    const output = await response.json();
    const index = output.data[0].intensity.actual;
    const intensity = output.data[0].intensity.index;
    return { index, intensity };
  },
);

const initialState = {};

// Reducer
const countrySlice = createSlice({
  name: 'intensity',
  initialState,
  extraReducers: {
    [fetchNatEmAsync.fulfilled]: (state, action) => (
      { ...action.payload }
    ),
  },
});

export { fetchNatEmAsync };

// export const {} = intensitySlice.actions;

export default countrySlice.reducer;
