import Filter from './components/filter'
import Personform from './components/personform'
import Persons from './components/persons'
import {useState, useEffect} from 'react';
import api from './services/communication'
import Notification from './components/notification';

const Heading = ({ heading }) => <h2>{heading}</h2>
  
const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState('')
  const [filter, setFilter] = useState('')
  const handleFilter = (e) => {setFilter(e.target.value)}
  const handlePersonChange = (e) => {setNewName(e.target.value)}
  const handlePhoneChange = (e) => {setNewNumber(e.target.value)}

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name === newName)
    const personObject = {name: newName, number: newNumber}
    let apiMethod

    if(person){
      if (window.confirm(`${newName} already exists, update number?`)){
        apiMethod = api.update(person.id, personObject)
      }
    }else{
      apiMethod = api.create(personObject)
    }

    apiMethod
    .then(res => {
      if(person){

        setPersons(persons.map(p => p.id !== person.id ? p :res.data))
        setMessage({text: `${newName} updated`, style: 'success'})
      }else{
        setPersons(persons.concat(res.data))
        setMessage({text: `Added ${newName}`, style: 'success'}) 
      }
      setNewNumber('')
      setNewName('')
    })
    .catch(err => {
      setMessage({text:err.response.data.error, style: "error"})
    })
    setTimeout(() => {setMessage(null)}, 5000)
  }
  
  const deletePerson = id => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)){
      api.remove(id)
      .then(res => {
        setPersons(persons.filter(person => person.id !== id))
        setMessage({text:`Successfully removed ${person.name}`, style: "success"})
      })
      .catch(err => {
        setMessage({text:err.response.data.error, style: "error"})
      })
    }  
    setTimeout(() => {setMessage(null)}, 5000)
  }
  
  useEffect(() => {
    api.getAll()
      .then(persons => {
      setPersons(persons)})
  }, [])

  return (
    <>
      <Heading heading={"Phonebook"}/>
      <Filter filter= {filter} handleFilter={handleFilter}/>

      <Heading heading={"add a new"}/>
      <Personform newname={newName} handlePersonChange={handlePersonChange}
        newNumber={newNumber} handlePhoneChange={handlePhoneChange}
        addPerson={addPerson}/>

      <Notification message={message} />

      <Heading heading={"Numbers"}/>
      <Persons filter={filter} persons={persons} deletePerson={deletePerson}/>
    </>
  )
}

export default App