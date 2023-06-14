import React, { useEffect, useState } from 'react'

const URL_WEATHER = 'https://api.open-meteo.com/v1/forecast?';
const URL_PARAM_LATITUDE = `latitude=`;
const URL_PARAM_LONGITUDE = `&longitude=`;
const URL_PARAM_DAILY_WEATHER = `&daily=temperature_2m_max,windspeed_10m_max`;
const URL_DAYS = `&forecast_days=`;
const URL_PARAM_TIMEZONE = `&timezone=Europe%2FBerlin`;


type weatherProps = {
  temperatureMax : number;
  windspeed : number;
}

const DetailedWeather = () => {
  const [weather,setWeather] = useState<weatherProps[]>([]);
  

  useEffect(()=>{

    try{
      (async () => {
        const url = URL_WEATHER+URL_PARAM_LATITUDE
        const response = await fetch()
      })()
    }catch(err){
      console.error(err);
    }
  },[])

  return (
    <div>DetailedWeather</div>
  )
}

export default DetailedWeather