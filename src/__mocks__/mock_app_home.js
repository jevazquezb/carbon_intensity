import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/configureStore';
import App from '../App';

const MockAppHome = () => (
  <Provider store={store}>
    <Router initialEntries={['/carbon_intensity']}>
      <App />
    </Router>
  </Provider>
);

export default MockAppHome;
