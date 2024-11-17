import { useState } from 'react';

import './App.css';

import { AppContext } from 'context/AppContext';
import PageRoutes from 'routes/PageRoutes';

function App() {
  const [appState, setAppState] = useState({});

  return (
    <div className="App">
      <AppContext.Provider value={{ appState, setAppState }}>
        <PageRoutes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
