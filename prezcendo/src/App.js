import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './css/App.css';

import TestComponent from './components/testComponent';
import { HeaderComponent, ContainerComponent } from './components/mainPageComponents';

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <ContainerComponent />
      <TestComponent />
    </div>
  );
}

export default App;
