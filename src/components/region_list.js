import greatBritain from '../images/great_britain.png';

function Country() {
  return (
    <section className="country-cont">
      <img
        src={greatBritain}
        className="map-size"
        alt="Great Britain map"
        title="Great Britain"
      />
      <div>
        <h2 className="country-title">UNITED</h2>
        <h2 className="country-title">KINGDOM</h2>
        <p className="country-amount">
          263 gCO
          <sub>2</sub>
          /KWH
        </p>
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
