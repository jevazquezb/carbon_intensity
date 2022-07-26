import { Icon } from '@iconify/react';

function Header() {
  return (
    <header>
      <Icon icon="eva:arrow-ios-back-fill" color="white" width="18" height="18" />
      <h1>Carbon Intensity in the UK</h1>
      <nav>
        <Icon icon="mdi:microphone" color="white" className="size" />
        <Icon icon="mdi:cog" color="white" className="size" />
      </nav>
    </header>
  );
}

export default Header;
