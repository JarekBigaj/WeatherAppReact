import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSun } from '@fortawesome/free-solid-svg-icons'

const URL_WEATHER = 'https://api.open-meteo.com/v1/forecast?';
const URL_PARAMS_CURRENT_WEATHER= 'current_weather=true';
const URL_API_GEOCODING = 'https://geocoding-api.open-meteo.com/v1/search?name=';

type weatherProps = {
  temperature : number;
  winddirection: number;
  windspeed:number;
  weatherCode: number;
}

type cityProps = {
  name:string;
  country:string;
  longitude: number;
  latitude:number;
}

const defaultCity:cityProps = {
  name:"Warsaw",
  country:'Poland',
  longitude:21.01,
  latitude:52.23
} 

const Weather = styled(({className}) => {
  const [currentCity, setCurrentCity] = useState<cityProps>(defaultCity);
  const [searchInput,setSearchInput] = useState<string>('');
  const [searchingCities,setSearchingCities] = useState<cityProps[]>([]);
  const [currentWeather, setCurrentWeather] = useState<weatherProps>({
    temperature: 0,
    winddirection: 0,
    windspeed: 0,
    weatherCode: 0
  });

  const getWeather = async () =>{
    const {latitude,longitude} = currentCity;
    const response = await fetch(`${URL_WEATHER}latitude=${latitude}&longitude=${longitude}&${URL_PARAMS_CURRENT_WEATHER}`);
    const json = response.json();
    return json
  }

  const getCity = async (input:string) =>{
    const response = await fetch(`${URL_API_GEOCODING}${input}`);
    const json = response.json();
    return json;
  }

  const handleChangeSearchInput = (event:any)=> setSearchInput(() => event.target.value);

  const isArrayResponse = (response: any): response is Array<cityProps> => {
    return Array.isArray(response);
  }

  useEffect(()=>{
    (async () => {
      try{
        const response = await getCity(searchInput);
        const {results} = response;
        setSearchingCities(() => {
          if(isArrayResponse(results)){
            const selectedData = (results as Array<cityProps>).map(city=> {
              return {
                name:city.name,
                country: city.country,
                longitude: city.longitude,
                latitude:city.latitude
              }
            })
            return selectedData;
          }
          return [];
        })
      }catch(err){
        console.error(err);
      }
    })()
  },[searchInput])

  useEffect(() => {
    (async () => {
      try{
        const response = await getWeather();
        const {current_weather} = response;
        console.log({current_weather});
        setCurrentWeather(() => {
          return {
            temperature: current_weather.temperature,
            winddirection: current_weather.winddirection,
            windspeed: current_weather.windspeed,
            weatherCode: current_weather.weathercode
          }
        })
      } catch(err){
        console.error(err);
      }
    })()
  }, [currentCity])

  const {name} = currentCity;
  const {temperature,winddirection,windspeed,weatherCode} = currentWeather;
  return (
    <div className={className}>
      <div className='container '>
        <div className='title-wrapper'>
          <div className='search-wrapper'>
            <p className='control has-icons-right'>
              <input type='text' className='input' value={searchInput} onChange={handleChangeSearchInput}/>
              <span className='icon is-right'>
                <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden='true'/>
              </span>
              <ul className='search-city-results'>
                {searchingCities.map((city)=>{
                  const {name,country,longitude,latitude} = city;
                  return <li key={`${longitude}${latitude}`}>{`${name} : ${country}`}</li>
                })}
              </ul>
            </p>
          </div>
          <div className='title-container'>
            <h1 className='city-name title is-right'>{name}</h1>
          </div>
        </div>
        <div className='weather-wrapper'>
          <div className='container columns is-mobile weather-currently-info-wrapper'>
            <span className='weather-currently-text'>Weather now</span>
            <i className='column'><FontAwesomeIcon icon={faSun} className='icon-weather-status'/></i>
            <div className='currently-weather-status-wrapper column'>
              <h1 className='title'>{temperature}℃</h1>
              <span>{weatherCode}</span>
            </div>
          </div>
          <div className='container columns is-mobile weather-currently-wind-wrapper'>

          </div>
        </div>
      </div>
    </div>
  )
})`
  position:relative;
  width:100%;
  margin-top:5em;
  color:white;

  .container{
    background-color:blue;
  }
  .title-container{
    text-align:left;
    margin-left:1em;
    padding-top:0.75em;
    padding-bottom:1.25em;
  }
  .search-wrapper {
    padding-top:0.75em;
    margin-left:0.75em;
    margin-right:0.75em;
    width:300px;
  }

  .title{
    color:white;
  }

  .weather-wrapper{
    padding-top: 1em;
    padding-bottom:1em;
    background-color: lightblue;
  }

  .weather-currently-info-wrapper{
    position:relative;
    text-align:left;
    background-color:transparent;
    border: 3px solid white;
  }

  .weather-currently-text{
    position:absolute;
    top:-15px;
  }

  .icon-weather-status{
    margin:0.25em;
    color:yellow;
    font-size:4em;
  }

  @media screen and (max-width:600px){
    .container{
      margin: 0 1em 0 1em;
    } 
    .search-wrapper{
      width: auto;
    }
  }
`

export default Weather