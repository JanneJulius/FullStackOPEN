const Filter = (props) => {

  return (
    <>
      <div>find countries</div>
      <input 
       value={props.filter}
       onChange={props.handleFilter}/>
    </>
  )
}
export default Filter