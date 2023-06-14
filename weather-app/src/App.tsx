import { Route, Routes } from 'react-router-dom';
import './App.css';
import Weather from './components/Weather';
import DetailedWeather from './components/DetailedWeather';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Weather/>}/>
        <Route path="/detailedweather" element={<DetailedWeather/>}/>
      </Routes>
    </div>
  );
}

export default App;
