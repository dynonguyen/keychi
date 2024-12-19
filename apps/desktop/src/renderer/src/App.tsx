import React from 'react';
import electronLogo from './assets/electron.svg';
import Versions from './components/Versions';

const App = () => {
  return (
    <React.Fragment>
      <img alt="logo" className="logo" src={electronLogo} />
      <Versions />
    </React.Fragment>
  );
};

export default App;
