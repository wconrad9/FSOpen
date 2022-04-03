import {useState, useEffect} from 'react'
import './App.css';
import axios from 'axios'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const CapitalWeather = ({ capital }) => {
  const [weatherData, setWeatherData] = useState(null)
  
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=${process.env.REACT_APP_API_KEY}`
  
  useEffect(() => {
    axios
    .get(endpoint)
    .then( response => {
      setWeatherData(response.data)
    })
  }, [])
  
  if (weatherData !== null) {
    const icon = weatherData.weather[0].icon
    return (
      <>
      <p>temperature {(weatherData.main.temp-273.15).toFixed(2)} celsius</p>
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={"weather icon"}/>
      <p>wind: {weatherData.wind.speed} m/s</p>
      </>
    )
  }
}

const CountryView = ({country}) => {
  const languages = country.languages
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>land area: {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.keys(languages).map( k => <li key={k}>{languages[k]}</li>)}
      </ul>
      <img src={country.flags.png} alt="flag"/>
      <h1>Weather in {country.capital}</h1>
      <CapitalWeather capital={country.capital}/>
      </div>
  )
}

const Countries = ({ countries }) => {

  const[selectedCountry, setSelectedCountry] = useState(null)


  const showCountry = (c) => {
    setSelectedCountry(c)
  }

  if (selectedCountry !== null) {
    return (
      <>
      <CountryView country={selectedCountry}/>
      <Button text={"back"} onClick={() => setSelectedCountry(null)}/>
      </>
    )
  }

  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter.</p>
    )
  } else if (countries.length <= 10 && countries.length > 1) {
    return (
      <ul>
      {countries.map( c => {
        return (
        <li key={c.name.common}>
          {c.name.common}
          <Button text={"show"} onClick={() => showCountry(c)}/>
        </li>
        )
      })}
      </ul>
    )
  } else if (countries.length === 0) {
    return
  } else {
    return (
      <>
        <CountryView country={countries[0]}/>
      </>
    )
  }
}

function App() {
  const [countryFilter, setCountryFilter] = useState('')
  const [countryList, setCountryList] = useState([])

  const filterCountries = (event) => {
    const newFilter = event.target.value.toLowerCase()
    setCountryFilter(newFilter)

    axios
      .get('https://restcountries.com/v3.1/all')
      .then( response => {
        const countries = response.data
        const filteredCountries = countries.filter( (country) => {
          const name = country.name.common.toLowerCase()
          return name.includes(newFilter)
        }
        )
        setCountryList(filteredCountries)
      })
  }

  return (
    <div>
      find countries <input value={countryFilter} onChange={filterCountries}/>
      {countryFilter ? <Countries countries={countryList}/> : null}
    </div>
  );
}

export default App;
