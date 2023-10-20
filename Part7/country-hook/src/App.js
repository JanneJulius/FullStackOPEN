import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const URI = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URI)
        setCountry({country: response.data,
          found: true})
      } catch (error) {
        setCountry({found: false})
      }
    }

    if (name) {
      fetchData()
    }
  }, [name, URI])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }
  const c = country.country

  return (
    <div>
      <h3>{c.name.common} </h3>
      <div>capital {c.capital[0]} </div>
      <div>population {c.population}</div> 
      <img src={c.flags.png} height='100' alt={`flag of ${c.name.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App