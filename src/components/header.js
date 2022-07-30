import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header>
      <NavLink className="return-cont" to="/carbon_intensity">
        <Icon
          icon="eva:arrow-ios-back-fill"
          color="white"
          className="region-link-icon"
        />
      </NavLink>
      <h1>Carbon Intensity in the UK</h1>
      <nav>
        <Icon icon="mdi:microphone" color="white" className="region-link-icon" />
        <Icon icon="mdi:cog" color="white" className="region-link-icon" />
      </nav>
    </header>
  );
}

export default Header;
