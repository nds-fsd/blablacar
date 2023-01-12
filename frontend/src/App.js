import React from 'react';
import Home from './components/home/home'
import './App.css';


function App() {
  return (
    <div>
      <BrowserRouter>
  <Routes>
    <Route path="/home" element={<Home />} />
  </Routes>
</BrowserRouter>

    </div>
  );
}

export default App;
