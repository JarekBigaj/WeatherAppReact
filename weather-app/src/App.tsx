import { Route, Routes } from 'react-router-dom';
import './App.css';
import Weather from './components/Weather';
import DetailedWeather from './components/DetailedWeather';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Weather/>}/>
        <Route path="/detailedweather" element={<DetailedWeather/>}/>
      </Routes>
  );
}

export default App;
