import React, {useState} from "react";
import {useMutation} from "@apollo/client";
import {EDIT_AUTHOR, ALL_AUTHORS} from "../queries";

const AuthorForm = ({authorsNames}) => {

  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ 
      { query: ALL_AUTHORS } ]
  })

  const submit = async (event) => {
    event.preventDefault();
    await editAuthor({
      variables: {name, born: parseInt(born)},
    });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <select value={name || ""} onChange={({target}) => setName(target.value)}>
            <option value="">Select an author</option>
            {authorsNames &&
              authorsNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({target}) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default AuthorForm;