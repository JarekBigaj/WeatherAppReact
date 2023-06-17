import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudBolt, faCloudRain, faCloudSun, faMagnifyingGlass, faSnowflake, faSun} from '@fortawesome/free-solid-svg-icons'
import weather_code_file from './weather-code.json'
import { useNavigate } from 'react-router-dom'
import NotificationAboutCity from './helper/CustomNotification'
import CustomNotificationComponent from './helper/CustomNotification'
import CustomNotification from './helper/CustomNotification'

const URL_WEATHER = 'https://api.open-meteo.com/v1/forecast?';
const URL_PARAMS_CURRENT_WEATHER= 'current_weather=true';
const URL_API_GEOCODING = 'https://geocoding-api.open-meteo.com/v1/search?name=';
const {weather_code_list} = weather_code_file;

interface weatherProps {
  temperature : number;
  winddirection: number;
  windspeed:number;
  weatherCode: number;
}

interface cityProps {
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
  const [message, setMessage] = useState<string>('');
  const [isVisible,setIsVisble] = useState<boolean>(() => false);
  const [currentWeather, setCurrentWeather] = useState<weatherProps>({
    temperature: 0,
    winddirection: 0,
    windspeed: 0,
    weatherCode: 0
  });
  const navigate = useNavigate();

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

  const handleNevigateWeatherForSeveralDays = (days:number,longitude:number,latitude:number,city:string) => 
    navigate(`/detailedweather?days=${days}&longitude=${longitude}&latitude=${latitude}&city=${city}`);

  const handleOnClickSearchInput = (city:cityProps) => {
    setCurrentCity({
      name:city.name,
      country: city.country,
      longitude:city.longitude,
      latitude:city.latitude
    });
    setSearchInput('');
  };
  const handleKeyDownSearchInput = (event:any,city:cityProps) =>{
    if(event.key === "Enter")
    {
      if(!city) {
        setIsVisble(true);
        setMessage("City not found!");
        return
      }
      
      setCurrentCity({
        name:city.name,
        country: city.country,
        longitude:city.longitude,
        latitude:city.latitude
      });
      setSearchInput('');
    } 
  }

  const isArrayResponse = (response: any): response is Array<cityProps> => {
    return Array.isArray(response);
  }

  const handleNotificationClose = () => {
    setMessage('');
    setIsVisble(false);
  };

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

  const {name,longitude,latitude} = currentCity;
  const {temperature,winddirection,windspeed,weatherCode} = currentWeather;
  const currentWeatherDescription = Object.entries(weather_code_list)
                                          .find(([key,value]) => {
                                            if(Number(key) === weatherCode)
                                              return value
                                          });
  const [code,description] = currentWeatherDescription?.length? currentWeatherDescription : [0,''];
  const weahterIcon = (code:string) =>{
    if(code === '0') return faSun;
    if(code === '1' || code === '2' || code === '3') return faCloudSun;

    if(code === '51' || code === '53' || code === '55') return faCloudRain;
    if(code === '95' || code === '96' || code === '99') return faCloudBolt;

    if(code === '56' || code === '57') return faSnowflake;
    if(code === '66' || code === '67') return faSnowflake;
    if(code === '85' || code === '86') return faSnowflake;
    if(code === '71' || code === '73' || code === '75' || code ==='77') return faSnowflake;

    if(code === '61'|| code === '63' || code === '65') return faCloudRain;
    if(code === '80'|| code === '81' || code === '82') return faCloudRain;
    
    return faSun;
  }
  return (
    <div className={className}>
      <CustomNotificationComponent 
        isVisible={isVisible}
        message={message}
        duration={4000}
        onClose={handleNotificationClose}
      />
      <div className='container content-wrapper'>
        <div className='title-wrapper'>
          <div className='search-wrapper'>
            <div className='control has-icons-right'>
              <input 
                type='text' 
                className='input' 
                value={searchInput} 
                onChange={handleChangeSearchInput}
                onKeyDown={(event) => {
                  handleKeyDownSearchInput(event,searchingCities[0])
                }}
              />
              <span className='icon is-right'>
                <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden='true'/>
              </span>
              <ul className='search-city-results'>
                {searchingCities.map((city)=>{
                  const {name,country,longitude,latitude} = city;
                  return <li key={`${longitude}${latitude}`} onClick={() => handleOnClickSearchInput(city)}>
                    {`${name} : ${country}`}
                    </li>
                })}
              </ul>
            </div>
          </div>
          <div className='title-container'>
            <h1 className='city-name title is-right'>{name}</h1>
          </div>
        </div>
        <div className='weather-wrapper'>
          <div className='container columns is-mobile weather-currently-info-wrapper'>
            <span className='weather-currently-text'>Weather now</span>
            <i className='column'><FontAwesomeIcon icon={weahterIcon(code.toString())} className='icon-weather-status'/></i>
            <div className='currently-weather-status-wrapper column'>
              <h1 className='title'>{temperature}℃</h1>
              <span>{description}</span>
            </div>
          </div>
          <div className='container columns is-mobile weather-currently-wind-wrapper'>
            <WindCompas winddirection={winddirection}/>
            <div className='column'>
              <h1 className='title'>{windspeed} km/h</h1>
            </div>
          </div>
        </div>
        <div className='container buttons-content-wrapper'>
          <div className='buttons buttons-wrapper'>
            <button 
              className='button is-info is-medium is-responsive'
              onClick={() => handleNevigateWeatherForSeveralDays(3,longitude,latitude,name)}
            >
              Weather for 3 days
            </button>
            <button 
              className='button is-info is-medium is-responsive'
              onClick={() => handleNevigateWeatherForSeveralDays(7,longitude,latitude,name)}
            >
              Weather for 7 days
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})`
  position:relative;
  width:100%;
  margin-top:5em;
  color: var(--color-text);

  .container{
    background-color:var(--color-container);
    width:40em;
  }

  .content-wrapper{
    border-radius:1em 1em 0 0;
  }

  .title-container{
    text-align:right;
    margin-left:1em;
    padding-top:0.75em;
    padding-bottom:1.25em;
    width:100%;
    
  }
  .title-wrapper{
    display:flex;
  }
  .search-wrapper {
    padding-top:0.75em;
    margin-left:0.75em;
    margin-right:0.75em;
    width:20em;
    min-width:20em;
  }

  .title{
    color:var(--color-text);
    margin-right:1em;
  }

  .weather-wrapper{
    padding: 2em;
    background-color: var(--color-component);
  }

  .weather-currently-info-wrapper{

    width:auto;
    position:relative;
    text-align:left;
    background-color:transparent;
    border: 0.25em solid  hsla(0, 0%, 100%, 0.2);
  }

  .weather-currently-text{
    position:absolute;
    top:-0.9em;
    left:0.9em;
    z-index:99;
  }

  .icon-weather-status{
    margin:0.25em;
    font-size:4em;
  }

  .search-city-results{
    position:absolute;
    text-align:left;
    top:3em;
    list-style-type: none;
    padding-left:0.3em;
    width:100%;
    max-height: 10em;
    color:black;
    background-color: #fff;
    overflow:hidden;
    overflow-y:auto;
    z-index:999;
    ::-webkit-scrollbar{
      display:none;
    }
  }

  .search-city-results li{
    cursor:pointer;
  }
  .search-city-results li:hover{
    background-color: whitesmoke;
  }

  .weather-currently-wind-wrapper{
    margin-top:0.75em;
    position:relative;
    width:auto;
    background-color: rgba(59, 61, 231, 0.09);
  }

  .buttons-wrapper{
    display:flex;
    justify-content:center;
    gap: 2em;
    padding:1em;
  }
  .button{
    background-color:var(--color-element);
  }
  .button:hover{
    background-color:hsl(155, 28%, 48%);
  }

  @media screen and (max-width:600px){
    font-size:0.75em;
    
    .container{
      margin: 0 1em 0 1em;
      width:auto;
    } 
    .search-wrapper{
      width: auto;
      min-width:10em;
    }

    .weather-wrapper{
      padding:1em 0 1em 0;
    }
    .title-wrapper{
      display:block;
    }
    .title-container{
      text-align:left;
    }
    .buttons-wrapper{
      display:flex;
      justify-content:center;
      gap: 1em;
      padding:1em;
    }
  
  }
`

const WindCompas = styled(({className,winddirection}) => {
  return (
          <div className={`${className} column`}>
            <div className='wind-direction'>
              <p className="sr-only">{winddirection}</p>
              <span className='windArrow'></span>
            </div>
          </div>
  )
})`
width:auto;

.wind-direction{
  --size: 6rem;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background-color: var(--color-element);
  display: grid;
  place-items: center;
}

.sr-only:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.windArrow{
  --size:1rem;
  height: calc(var(--size)*3);
  width: var(--size);
  background-color:  white;
  clip-path: polygon(50% 0, 0% 100%, 100% 100%);
  transform: translateY(-50%)
  rotate(${props => props.winddirection +"deg" || "0deg"});
  transform-origin: bottom center;
  transition: transform 500ms ease;
}
`

export default Weather