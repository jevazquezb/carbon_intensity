import React, { useEffect } from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import { fetchNatEmAsync } from '../redux/country/country';
import uk from '../images/great_britain.png';

function Country() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNatEmAsync());
  }, []);

  const carbonIntensity = useSelector((state) => state.country);
  const { index, intensity } = carbonIntensity;

  const displayIndex = () => `${index} gCO\u2082/KWH`;
  const displayIntensity = () => `Intensity: ${intensity}`;

  return (
    <section className="country-cont">
      <img
        src={uk}
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

function List() {
  return (
    <section>
      <h3 className="list-title">STATS BY REGION</h3>
      <div>
        <div>
          <h4>CZECH REPUBLIC</h4>
          <p>954</p>
        </div>
      </div>
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

export default RegionList;
