import React, { useState, useEffect} from 'react'
import axios from 'axios'

const SimpleCountry = ({obj, setFilter}) => {
  return(
    <p>
      {obj.name.common}
      <button onClick={()=>setFilter(obj.name.common.toLowerCase())}>show</button>
    </p>
  )
}

const Weather = ({obj}) => {
  
  const [weather, setWeather] = useState(null);
 
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${obj.capital}&appid=` + process.env.REACT_APP_API_KEY)
      .then(response =>{
        console.log(response.data)
        setWeather(response.data)
      }
      )
  }, [obj.capital]);   

  if(weather){
    return(
      <>
        <p><b>temperature: </b> {weather.main.temp-273} Celcius</p>
        <img src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
        <p><b>wind: </b> {weather.wind.speed} mph</p>
      </>
    )
  }
}

const DetailedCountry = ({obj}) => {
  return(
    <>
      <h1>{obj.name.common}</h1>
      <ul style={{listStyle: 'none'}}>
        <li>capital {obj.capital}</li>
        <li>area {obj.area}</li>
      </ul>
      <h2>languages:</h2>
      <ul>
        {Object.values(obj.languages).map(val => <li>{val}</li>)}
      </ul>
      <img alt = {"flagpic"} src={Object.values(obj.flags)[0]} width="20%" height="20%"></img>
      <h1>Weather in {obj.capital}</h1>
      <Weather key={obj.name.common}obj={obj} />
    </>
  )
}

const Countries = ({filter, countries, setFilter}) => {

  const filteredArray = countries.filter(obj => obj.name.common.includes(filter) || obj.name.common.toLowerCase().includes(filter))

  if(filteredArray.length > 10)
  {
    return "Too many matches, specify another filter";
  }
  else if(filteredArray.length <= 10 && filteredArray.length > 1)
  {
    return filteredArray.map(obj => <SimpleCountry key={obj.name.common} obj={obj} setFilter={setFilter}/>)
  }
  else if( filteredArray.length === 1)
  {
    return filteredArray.map(obj => <DetailedCountry key={obj.name.common} obj={obj} />)
  }
}

export default Countries;