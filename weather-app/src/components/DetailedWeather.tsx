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
      <div className='container'>
        <div className='buttons buttons-wrapper'>
          <button className='button is-danger' onClick={handleNavigateBack}>Back</button>
        </div>
        <table>
          <caption>
            <div className='text-wrapper'>
              Weather in {city} for {days} days
            </div>
          </caption>
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
                  return <td key={`${key}${value}`} data-cell={key}>{value}</td>
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
  padding:0.75em;

  table{
    min-width:100%;
    border-collapse:collapse;
    background-color:var(--color-container);
    color:var(--color-text);
    margin-top:1.5rem;
  }

  caption,
  th,
  td {
     padding: 1rem;
   }
  
   caption,
   th {
     text-align: left;
     pointer-events:none;
     text-transform: uppercase;
   }
  
   caption {
     font-weight: 700;
     text-align:center;
     background: hsl(213, 42%, 10%);
     border: hsl(213, 42%, 10%) solid 1px;
     border-radius:15px 15px 0 0;
     font-size: 1.5em;
     font-weight: 700;
   }
  
   th {
     background: hsl(213, 42%, 15%);
     color:var(--color-text);
   }
  
   tr:nth-of-type(2n){
     background: hsl(0 0% 0% /0.1);
    
   }
   
  
   @media (max-width: 650px) {
     caption{
      text-align:left;
      font-size:1em;
     }
     
     th{
       display:none;
     }
     td{
       display:grid;
       grid-template-columns: 15ch auto;
       gap:0.5rem;
       padding: 0.5rem 1rem;
     }
    
     td:first-child{
       padding-top:1rem;
     }
    
     td:last-child{
       padding-bottom:1rem;
     }
    
     td::before{
       content: attr(data-cell) ": ";
       font-weight:700;
       text-transform: capitalize;
       
     }
     .text-wrapper{
      max-width: calc(100% - 5em);
     }
   }
  
   .buttons-wrapper{
     position:absolute;
     top:0.6em;
     right:0.75em;
     z-index:99;
   }

`

export default DetailedWeather