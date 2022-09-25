
const Person = ({ obj, deletePerson}) => {
  return(
    <div style={{display: "flex"}}>
      <li>{obj.name} {obj.number}</li>
      <button onClick={deletePerson}>delete</button>
    </div>  
  )
}

const Persons = ({filter, persons, deletePerson}) => {

  return (
    <ul style={{listStyle: 'none'}}>
        {persons.filter(obj => obj.name.toLowerCase().includes(filter.toLowerCase()))
          .map(obj => <Person key={obj.id} obj={obj} deletePerson={()=>deletePerson(obj.id)}/>)}
    </ul>
  )
}

export default Persons