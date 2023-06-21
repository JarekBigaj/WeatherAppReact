import LanguageSelectors from './components/LanguageSelectors';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Weather from './components/Weather';
import DetailedWeather from './components/DetailedWeather';
import { I18nContext} from 'react-i18next';
import i18n from './i18n';
import { useEffect, useState } from 'react';
import "/node_modules/flag-icons/css/flag-icons.min.css";

function App() {
  const [contextValue, setContextValue] = useState({ i18n });

  const changeLanguage = (language:string) => {
    i18n.changeLanguage(language);
  }

  useEffect(() => {
    const i18nUpdateHandler = () => {
      setContextValue({ i18n });
    };

    i18n.on('languageChanged', i18nUpdateHandler);

    return () => {
      i18n.off('languageChanged', i18nUpdateHandler);
    };
  }, []);

  return (
    <I18nContext.Provider value={{i18n}} >
      <div className='app'>
        <LanguageSelectors changeLanguage={changeLanguage}/>
        <Routes>
          <Route path="/" element={<Weather/>}/>
          <Route path="/detailedweather" element={<DetailedWeather/>}/>
        </Routes>
      </div>
    </I18nContext.Provider>
  );
}

export default App;