import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/configureStore';
import App from '../App';

const MockAppDetails = () => (
  <Provider store={store}>
    <Router initialEntries={['/carbon_intensity/region/13']}>
      <App />
    </Router>
  </Provider>
);

export default MockAppDetails;
