import { BrowserRouter } from 'react-router-dom';

import Dashboard from 'containers/Dashboard/Dashboard';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Dashboard/>
    </BrowserRouter>
  );
}

export default App;
