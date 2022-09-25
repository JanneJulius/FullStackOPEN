
const Personform = ({newName, newNumber, handlePersonChange,
  handlePhoneChange, addPerson}) => {

  return (
    <form onSubmit={addPerson}>
      <div>name: <input value={newName} onChange={handlePersonChange}/></div>
      <div>number: <input value={newNumber} onChange={handlePhoneChange}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default Personform