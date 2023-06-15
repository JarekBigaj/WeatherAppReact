import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { QueryParams, getQueryParams } from '../helper/helperQueryParams';
import styled from 'styled-components';

const URL_WEATHER = 'https://api.open-meteo.com/v1/forecast?';
const URL_PARAM_LATITUDE = `latitude=`;
const URL_PARAM_LONGITUDE = `&longitude=`;
const URL_PARAM_DAILY_WEATHER = `&daily=temperature_2m_max,windspeed_10m_max`;
const URL_DAYS = `&forecast_days=`;
const URL_PARAM_TIMEZONE = `&timezone=Europe%2FBerlin`;


interface WeatherProps {
  time: object;
  temperatureMax : number;
  windspeed : number;
}

const DetailedWeather = styled(({className}) => {
  const [weather,setWeather] = useState<WeatherProps[]>([]);
  const location = useLocation();
  const queryParams:QueryParams = getQueryParams(location.search);
  const navigate = useNavigate();

  const {days,longitude,latitude,city} = queryParams;
  const url = URL_WEATHER
          +URL_PARAM_LATITUDE+latitude
          +URL_PARAM_LONGITUDE+longitude
          +URL_PARAM_DAILY_WEATHER
          +URL_DAYS+days
          +URL_PARAM_TIMEZONE;

  const getWeatherForSeveralDays = async () =>{
    const response = await fetch(url);
    const json = response.json();
    return json;
  }

  const handleNavigateBack = () => navigate('/');

  useEffect(()=>{

    try{
      (async () => {
        const response = await getWeatherForSeveralDays();
        const {daily,daily_units} = response; 
        const {temperature_2m_max,time,windspeed_10m_max} = daily;
        const transformedData:WeatherProps[] = temperature_2m_max
          .map((temperatureMax:number, index:number) =>({
            time:time[index],
            temperatureMax,
            windspeed:windspeed_10m_max[index]
          }));

        setWeather(transformedData);
      })()
    }catch(err){
      console.error(err);
    }
  },[])

  return (
    <div className={className}>
      <div className='container is-fullhd columns is-mobile'>
        <div className='column title-wrapper'>
          <h1 className='title'>{city}</h1>
        </div>
        <div className='column buttons buttons-wrapper'>
          <button className='button is-danger' onClick={handleNavigateBack}>Back</button>
        </div>
      </div>
      <div className='container table-wrapper'>
        <table className='table is-bordered is-striped is-narrow is-fullwidth'>
          <caption className='subtitle'>Weather for {days} days.</caption>
          <thead>
            <tr>
              <th>Data</th>
              <th>Temperature</th>
              <th>Wind Speed</th>
            </tr>
          </thead>
          <tbody>
            {weather.map((element) => (
              <tr key={`rows${element.time}`}>
                {Object.entries(element).map(([key,value])=>{
                  return <td key={`${key}${value}`}>{value}</td>
                })}
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
})`
  padding:1em;

  .title-wrapper{
    padding-left:2em;
    text-align:left;
  }
  .buttons-wrapper{
    display:flex;
    justify-content:right;
  }
  caption{
  }
  th{
    background-color:hsla(197, 71%, 73%, 1);
  }
  tr {
    text-align:left;
  }

`

export default DetailedWeather