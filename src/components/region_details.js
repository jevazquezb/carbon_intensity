import React, { useEffect } from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { intAsync } from '../redux/intensities/intensities';
import { fetchCarbonAsync } from '../redux/sources/sources';
import {
  dir,
  displayCarbon,
  displayIntensity,
} from './region_list';

function DisplayRegion({ intensities }) {
  let { name } = intensities;
  const { forecast, intensity } = intensities;

  if (name === 'North Wales & Merseyside') name = 'North Wales';
  else if (name === 'GB') name = 'United Kingdom';

  return (
    <section className="country-cont">
      <img
        src={dir(name)}
        className="map-size"
        alt={`${name} map`}
        title={name}
      />
      <div>
        <h2 className="country-title">{name}</h2>
        <p className="country-amount">{ displayCarbon(forecast) }</p>
        <p className="country-amount">{ displayIntensity(intensity) }</p>
      </div>
    </section>
  );
}

function SourceItem({ source }) {
  const { fuel, perc } = source;
  const upFuel = fuel[0].toUpperCase() + fuel.slice(1);
  return (
    <li className="fuel-cont">
      <h4 className="fuel-title">{upFuel}</h4>
      <p className="fuel-perc">{ `${perc} %` }</p>
      <Icon
        icon="uil:arrow-circle-right"
        color="white"
        className="region-link-icon big-icon"
      />
    </li>
  );
}

function Sources({ sources }) {
  const createList = () => {
    const sourcesCopy = [...sources];
    const orderedSources = sourcesCopy.sort((a, b) => b.perc - a.perc);
    let count = 0;
    const list = orderedSources.map((source) => {
      count += 1;
      return (
        <SourceItem
          source={source}
          key={`${count}`}
        />
      );
    });
    return list;
  };

  return (
    <section>
      <div className="search-bar">
        <h3 className="list-title">CARBON SOURCES</h3>
      </div>
      <ul>
        { createList() }
      </ul>
    </section>
  );
}

function RegionDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const intensities = useSelector((state) => state.intensities);
  const sources = useSelector((state) => state.sources);

  useEffect(() => {
    dispatch(intAsync(id));
    dispatch(fetchCarbonAsync(id));
  }, []);

  return (
    <>
      <DisplayRegion intensities={intensities} />
      <Sources sources={sources} />
    </>
  );
}

DisplayRegion.propTypes = {
  intensities: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    forecast: PropTypes.number,
    intensity: PropTypes.string,
  }).isRequired,
};

Sources.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.shape({
    fuel: PropTypes.string,
    perc: PropTypes.number,
  })).isRequired,
};

SourceItem.propTypes = {
  source: PropTypes.shape({
    fuel: PropTypes.string,
    perc: PropTypes.number,
  }).isRequired,
};

export default RegionDetails;
