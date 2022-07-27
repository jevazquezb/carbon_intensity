import React, { useEffect } from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Icon } from '@iconify/react';
import { fetchSrcAsync } from '../redux/sources/sources';
import {
  dir,
  displayCarbon,
  displayIntensity,
} from './region_list';

function DisplayRegion({ region }) {
  let { name } = region;
  const { forecast, intensity } = region;

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

function RegionDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const region = useSelector((state) => state.sources);

  useEffect(() => {
    dispatch(fetchSrcAsync(id));
  }, []);

  return (
    <>
      <DisplayRegion region={region} />
      {/* <Sources /> */}
    </>
  );
}

DisplayRegion.propTypes = {
  region: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    forecast: PropTypes.number,
    intensity: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.shape({
      fuel: PropTypes.string,
      perc: PropTypes.number,
    })),
  }).isRequired,
};

export default RegionDetails;
