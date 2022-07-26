import { Icon } from '@iconify/react';

function Header() {
  return (
    <header>
      <h1>Carbon Intensity in the UK</h1>
      <nav>
        <Icon icon="mdi:microphone" color="white" width="50" height="50" />
        <Icon icon="mdi:cog" color="white" width="50" height="50" />
      </nav>
    </header>
  );
}

export default Header;
