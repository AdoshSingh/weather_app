import React from 'react';
import MainInfo from './components/content.js';
import { useState } from 'react';
import icons from './components/customIcons/exo';

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState(undefined);

  const updateParentState = (newValue) => {
    setWeatherData(newValue);
  };

  return (
    <div className="flex justify-center items-center h-screen font-dos" style={{
      backgroundImage: `url(${icons.background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <MainInfo weatherData={weatherData} updateParentState={updateParentState} />
    </div>
  )
}