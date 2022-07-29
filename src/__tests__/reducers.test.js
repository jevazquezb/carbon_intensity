import countryReducer, { fetchNatEmAsync } from '../redux/country/country';
import regionReducer, { fetchIntAsync } from '../redux/region/region';
import intensityReducer, { intAsync } from '../redux/intensities/intensities';
import sourceReducer, { fetchCarbonAsync } from '../redux/sources/sources';

describe('Country reducer tests', () => {
  test('Gets new state when countryReducer is fulfilled', () => {
    const initialState = {};
    const action = {
      type: fetchNatEmAsync.fulfilled.type,
      payload: { index: 305, intensity: 'high' },
    };
    const state = countryReducer(initialState, action);
    expect(state).toEqual({ index: 305, intensity: 'high' });
  });
});

describe('Region reducer tests', () => {
  test('Gets new state when regionReducer is fulfilled', () => {
    const initialState = [];
    const fetchedData = [
      {
        id: 1,
        name: 'North Scotland',
        intensity: {
          forecast: 251,
          index: 'high',
        },
      },
      {
        id: 5,
        name: 'Yorkshire',
        intensity: {
          forecast: 304,
          index: 'high',
        },
      },
      {
        id: 13,
        name: 'London',
        intensity: {
          forecast: 298,
          index: 'high',
        },
      },
    ];
    const action = {
      type: fetchIntAsync.fulfilled.type,
      payload: fetchedData,
    };
    const state = regionReducer(initialState, action);
    expect(state).toEqual(fetchedData);
  });

  test('The forecast of an element matches the one in the initial state when regionReducer is fulfilled', () => {
    const initialState = [];
    const fetchedData = [
      {
        id: 1,
        name: 'North Scotland',
        intensity: {
          forecast: 251,
          index: 'high',
        },
      },
      {
        id: 5,
        name: 'Yorkshire',
        intensity: {
          forecast: 304,
          index: 'high',
        },
      },
      {
        id: 13,
        name: 'London',
        intensity: {
          forecast: 298,
          index: 'high',
        },
      },
    ];
    const action = {
      type: fetchIntAsync.fulfilled.type,
      payload: fetchedData,
    };
    const state = regionReducer(initialState, action);
    expect(state[2].intensity.forecast).toEqual(298);
  });
});

describe('Intensity reducer tests', () => {
  test('Gets new state when intensityReducer is fulfilled', () => {
    const initialState = {};
    const fetchedData = {
      id: 9,
      name: 'East Midlands',
      forecast: 460,
      intensity: 'very high',
    };
    const action = {
      type: intAsync.fulfilled.type,
      payload: fetchedData,
    };
    const state = intensityReducer(initialState, action);
    expect(state).toEqual(fetchedData);
  });

  test('Match a property value when intensityReducer is fulfilled', () => {
    const initialState = {};
    const fetchedData = {
      id: 9,
      name: 'East Midlands',
      forecast: 460,
      intensity: 'very high',
    };
    const action = {
      type: intAsync.fulfilled.type,
      payload: fetchedData,
    };
    const state = intensityReducer(initialState, action);
    expect(state.intensity).toEqual('very high');
  });
});

describe('Source reducer tests', () => {
  test('Gets new state when sourceReducer is fulfilled', () => {
    const initialState = [];
    const fetchedData = [
      { fuel: 'nuclear', perc: 43.2 },
      { fuel: 'gas', perc: 55.6 },
      { fuel: 'wind', perc: 1 },
    ];
    const action = {
      type: fetchCarbonAsync.fulfilled.type,
      payload: fetchedData,
    };
    const state = sourceReducer(initialState, action);
    expect(state).toEqual(fetchedData);
  });

  test('Match a property value when sourceReducer is fulfilled', () => {
    const initialState = [];
    const fetchedData = [
      { fuel: 'gas', perc: 70.8 },
      { fuel: 'nuclear', perc: 15.6 },
      { fuel: 'coal', perc: 4.9 },
    ];
    const action = {
      type: fetchCarbonAsync.fulfilled.type,
      payload: fetchedData,
    };
    const state = sourceReducer(initialState, action);
    expect(state[0].perc).toEqual(70.8);
  });
});
