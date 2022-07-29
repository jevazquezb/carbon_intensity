import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { fetchNatEmAsync } from '../redux/country/country';
import { fetchIntAsync } from '../redux/region/region';
import UK from '../images/great_britain.png';
import NS from '../images/north_scotland.png';
import SS from '../images/south_scotland.png';
import NWE from '../images/north_west.png';
import NEE from '../images/north_east.png';
import York from '../images/yorkshire.png';
import NW from '../images/north_wales.png';
import SW from '../images/south_wales.png';
import WM from '../images/west_midlands.png';
import EM from '../images/east_midlands.png';
import EE from '../images/east_england.png';
import SWE from '../images/south_west_england.png';
import SE from '../images/south_england.png';
import London from '../images/london.png';
import SEE from '../images/south_east_england.png';
import England from '../images/england.png';
import Scotland from '../images/scotland.png';
import Wales from '../images/wales.png';

function displayCarbon(carbon) {
  return carbon ? `${carbon} gCO\u2082/KWH` : 'N/A';
}

function displayIntensity(intensity) {
  return intensity ? `Intensity: ${intensity}` : 'N/A';
}

function dir(name) {
  switch (name) {
    case 'North Scotland':
      return NS;
    case 'South Scotland':
      return SS;
    case 'North West England':
      return NWE;
    case 'North East England':
      return NEE;
    case 'Yorkshire':
      return York;
    case 'North Wales':
      return NW;
    case 'South Wales':
      return SW;
    case 'West Midlands':
      return WM;
    case 'East Midlands':
      return EM;
    case 'East England':
      return EE;
    case 'South West England':
      return SWE;
    case 'South England':
      return SE;
    case 'London':
      return London;
    case 'South East England':
      return SEE;
    case 'Scotland':
      return Scotland;
    case 'Wales':
      return Wales;
    case 'England':
      return England;
    default:
      return UK;
  }
}

function Country() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNatEmAsync());
  }, []);

  const carbonIntensity = useSelector((state) => state.country);
  const { index, intensity } = carbonIntensity;

  return (
    <section className="country-cont">
      <NavLink className="region-link country-link" to={`/region/${18}`}>
        <Icon
          icon="uil:arrow-circle-right"
          color="white"
          className="region-link-icon"
        />
      </NavLink>
      <img
        src={UK}
        className="map-size"
        alt="Great Britain map"
        title="Great Britain"
      />
      <div>
        <h2 className="country-title">UNITED</h2>
        <h2 className="country-title">KINGDOM</h2>
        <p className="country-amount">{ displayCarbon(index) }</p>
        <p className="country-amount">{ displayIntensity(intensity) }</p>
      </div>
    </section>
  );
}

function Region({ region }) {
  let { name } = region;
  const { id, intensity } = region;
  const { forecast, index } = intensity;

  if (name === 'North Wales & Merseyside') name = 'North Wales';

  return (
    <li className="region-cell">
      <NavLink className="region-link" to={`/region/${id}`}>
        <Icon
          icon="uil:arrow-circle-right"
          color="white"
          className="region-link-icon"
        />
      </NavLink>
      <img
        src={dir(name)}
        alt={`${name} map`}
        title={name}
        className="region-img"
      />
      <h4 className="region-title">{name}</h4>
      <p className="region-amount">{ displayCarbon(forecast) }</p>
      <p className="region-amount">{ displayIntensity(index) }</p>
    </li>
  );
}

function SearchRegion({ regionList, searchRegion, regionInputHandler }) {
  const nameList = regionList.map((region) => region.name);

  const createDropList = (nameList) => {
    let count = 0;
    const list = nameList.map((name) => {
      let regionName = name;
      count += 1;
      if (regionName === 'North Wales & Merseyside') regionName = 'North Wales';
      return (
        <option key={count}>{ regionName }</option>
      );
    });
    return list;
  };

  return (
    <div className="search-bar">
      <h3 className="list-title">STATS BY REGION</h3>
      <input
        list="regions"
        placeholder="Search by region"
        className="search"
        value={searchRegion}
        onChange={regionInputHandler}
      />
      <datalist id="regions">
        { createDropList(nameList) }
      </datalist>
    </div>
  );
}

function filterRegions(inputRegion, regionList) {
  const [shownRegions, setShownRegions] = useState(regionList);

  // Any time the input changes.
  useEffect(() => {
    const adjustedInput = inputRegion.toLowerCase().trim();
    setShownRegions(regionList.filter((region) => {
      const regionName = region.name.toLowerCase();
      return regionName.includes(adjustedInput);
    }));
  }, [inputRegion]);

  return shownRegions;
}

function List() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIntAsync());
  }, []);
  const regionsCarbon = useSelector((state) => state.region);
  const [searchRegion, setSearchRegion] = useState('');

  const UkLessList = regionsCarbon.filter((region) => (
    region.name !== 'GB'
  ));

  const filteredRegions = filterRegions(searchRegion, UkLessList);

  let displayRegion;
  if (filteredRegions.length === 0) {
    displayRegion = UkLessList;
  } else {
    displayRegion = filteredRegions;
  }

  const regionInputHandler = (e) => {
    setSearchRegion(e.target.value);
  };

  const createList = (regionsArr) => {
    const list = regionsArr.map((region) => (
      <Region
        region={region}
        key={region.id}
      />
    ));
    return list;
  };

  return (
    <section>
      <SearchRegion
        regionList={UkLessList}
        searchRegion={searchRegion}
        regionInputHandler={regionInputHandler}
      />
      <ul className="list-cont">
        { createList(displayRegion) }
      </ul>
    </section>
  );
}

function RegionList() {
  return (
    <>
      <Country />
      <List />
    </>
  );
}

SearchRegion.propTypes = {
  regionList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    intensity: PropTypes.shape({
      forecast: PropTypes.number,
      index: PropTypes.string,
    }),
  })).isRequired,
  searchRegion: PropTypes.string.isRequired,
  regionInputHandler: PropTypes.func.isRequired,
};

Region.propTypes = {
  region: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    intensity: PropTypes.shape({
      forecast: PropTypes.number,
      index: PropTypes.string,
    }),
  }).isRequired,
};

export { dir, displayCarbon, displayIntensity };

export default RegionList;
