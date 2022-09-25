import Filter from './components/filter'
import Countries from './components/countries'
import {useState, useEffect} from 'react';
import axios from 'axios'


function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const handleFilter = (e) => {setFilter(e.target.value)}
  

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <>
      <Filter filter= {filter} handleFilter={handleFilter}/>
      <Countries filter={filter} countries={countries} setFilter={setFilter} />
    </>
  );
}

export default App;
