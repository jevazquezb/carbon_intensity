import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { fetchNatEmAsync } from '../redux/country/country';
import { fetchSrcAsync } from '../redux/region/region';
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

function Country() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNatEmAsync());
  }, []);

  const carbonIntensity = useSelector((state) => state.country);
  const { index, intensity } = carbonIntensity;

  const displayIndex = () => (
    index ? `${index} gCO\u2082/KWH` : 'N/A'
  );

  const displayIntensity = () => `Intensity: ${intensity}`;

  return (
    <section className="country-cont">
      <Icon
        icon="uil:arrow-circle-right"
        color="white"
        className="country-link"
      />
      <img
        src={UK}
        className="map-size"
        alt="Great Britain map"
        title="Great Britain"
      />
      <div>
        <h2 className="country-title">UNITED</h2>
        <h2 className="country-title">KINGDOM</h2>
        <p className="country-amount">{ displayIndex() }</p>
        <p className="country-amount">{ displayIntensity() }</p>
      </div>
    </section>
  );
}

function Region({ region }) {
  let { name } = region;
  const { id, intensity } = region;
  const { forecast, index } = intensity;

  if (name === 'North Wales & Merseyside') name = 'North Wales';

  const dir = (name) => {
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
      default:
        return England;
    }
  };

  const displayIndex = () => (
    index ? `${forecast} gCO\u2082/KWH` : 'N/A'
  );

  const displayIntensity = () => `Intensity: ${index}`;

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
      <p className="region-amount">{ displayIndex() }</p>
      <p className="region-amount">{ displayIntensity() }</p>
    </li>
  );
}

function List() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSrcAsync());
  }, []);

  const regionsCarbon = useSelector((state) => state.region);

  const createList = () => {
    const filteredList = regionsCarbon.filter((region) => (
      region.name !== 'GB'
    ));

    const list = filteredList.map((region) => (
      <Region
        region={region}
        key={region.id}
      />
    ));
    return list;
  };

  return (
    <section>
      <h3 className="list-title">STATS BY REGION</h3>
      <ul className="list-cont">
        { createList() }
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

Region.propTypes = {
  region: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    intensity: PropTypes.shape({
      forecast: PropTypes.number,
      index: PropTypes.string,
    }),
    sources: PropTypes.arrayOf(PropTypes.shape({
      fuel: PropTypes.string,
      perc: PropTypes.number,
    })),
  }).isRequired,
};

export default RegionList;
