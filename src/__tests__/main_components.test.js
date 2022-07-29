import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/header';
import RegionList from '../components/region_list';
import RegionDetails from '../components/region_details';
import App from '../App';

describe('Render main components correctly', () => {
  test('Render Header component correctly', () => {
    const ContHeader = () => {
      <Router>
        <Header />
      </Router>;
    };
    const headerSnap = renderer.create(<ContHeader />).toJSON();
    expect(headerSnap).toMatchSnapshot();
  });

  test('Render RegionList component correctly', () => {
    const ContRegionList = () => {
      <Router>
        <RegionList />
      </Router>;
    };
    const regionListSnap = renderer.create(<ContRegionList />).toJSON();
    expect(regionListSnap).toMatchSnapshot();
  });

  test('Render RegionDetails component correctly', () => {
    const ContRegionDetails = () => {
      <Router>
        <RegionDetails />
      </Router>;
    };
    const regionDetailsSnap = renderer.create(<ContRegionDetails />).toJSON();
    expect(regionDetailsSnap).toMatchSnapshot();
  });

  test('Render App component correctly', () => {
    const ContApp = () => {
      <Router>
        <App />
      </Router>;
    };
    const appSnap = renderer.create(<ContApp />).toJSON();
    expect(appSnap).toMatchSnapshot();
  });
});
