import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import RegionList from './components/region_list';
import RegionDetails from './components/region_details';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/carbon_intensity" element={<RegionList />} />
          <Route path="/carbon_intensity/region/:id" element={<RegionDetails />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
