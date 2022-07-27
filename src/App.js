import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import RegionList from './components/region_list';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<RegionList />} />
          {/* <Route path="/region" element={<Region />} /> */}
        </Routes>
      </main>
    </>
  );
}

export default App;
