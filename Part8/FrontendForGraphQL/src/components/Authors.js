import AuthorForm from "./AuthorForm";

const Authors = ({show, setError, authorResult}) => {

  if (!show) {
    return null
  }

  if (authorResult.loading) {
    return <div>Loading authors...</div>;
  }

  if (authorResult.error) {
    setError('Error fetching authors.');
    return null;
  }

  const authors = authorResult.data.allAuthors || [];

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorForm authorsNames={authors.map((a) => a.name)}/>
      
    </div>
  )
}

export default Authors
