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

    // Empty number or name
    if(newName === "" || newNumber === ""){
      setMessage({text:`Please fill the name and the number`, style: "error"})
      setTimeout(() => {setMessage(null)}, 5000)
    }
    // Already in phonebook. 
    else if (persons.find(p => p.name === newName)){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const id = person.id
        const changedPerson = { ...person, number: newNumber}
        api.update(id, changedPerson)
          .then(res => {
            setPersons(persons.map(person => person.id !== id ? person :res))
            setMessage({text:`Changed successfully the number of ${person.name}`,style: "success"})
            setTimeout(() => {setMessage(null)}, 5000)
            setNewNumber('')
            setNewName('')
          }).catch(error => {
            setMessage({text:`Person '${person.name}' has already removed from server`, style: "error"})
            setTimeout(() => {setMessage(null)}, 5000)
            setPersons(persons.filter(p => p.id !== id))
          })
      }
    }// New name
    else{
      const noteObject = {name: newName, number: newNumber}
      api.create(noteObject)
        .then(res => {
        setPersons(persons.concat(res))
        setNewNumber('')
        setNewName('')
      })

      setMessage({text: `Added ${newName}`, style: 'success'})
      setTimeout(() => {setMessage(null)}, 5000)
    } 
  }
  
  const deletePerson = id => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)){
      api.remove(id)
      .then(p => {
        setPersons(persons.filter(person => person.id !== id))
        setMessage({text:`Successfully removed ${person.name}`, style: "success"})
        setTimeout(() => {setMessage(null)}, 5000)
      })
      .catch(error => {
        setMessage({text:`Person '${person.name}' has already removed from server`, style: "error"})
        setTimeout(() => {setMessage(null)}, 5000)
        setPersons(persons.filter(p => p.id !== id))
      })
    }  
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