// App.js

import './App.css';
import { Route, Routes } from 'react-router-dom';
// import { SavedQuotesButtonHeader } from './components/SavedQuotesButton';
import { Home } from './components/Home';
import SavedQuotes from './components/SavedQuotes';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved-quotes" element={<SavedQuotes />} />
      </Routes>
    </div>
  );
}

export default App;
