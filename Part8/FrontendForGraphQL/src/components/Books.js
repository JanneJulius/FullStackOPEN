import { useState } from 'react'

const Books = ({show, setError, bookResult}) => {

  const [filter, setFilter] = useState("all");

  if (!show) {
    return null
  }

  if (bookResult.loading) {
    return <div>Loading authors...</div>;
  }

  if (bookResult.error) {
    setError('Error fetching authors.');
    return null;
  }

  const books = bookResult.data.allBooks || [];
  const genresSet = new Set();

  books.forEach((book) => {
    book.genres.forEach((genre) => {
      genresSet.add(genre);
    });
  });

  const genres = ["all", ...genresSet];

  const handleClick = (event) => {
    setFilter(event.target.value)
  }

  const filteredBooks = filter === "all" ? books : books.filter((book) => book.genres.includes(filter));

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>))}
        </tbody>
      </table>

      <h3>genres</h3>
      {genres.map((value, index) => (
        <button 
          key={index} 
          onClick={handleClick}
          style={{ fontWeight: filter === value ? "bold" : "normal" }}
          value={value}>{value}</button>
      ))}
    </div>
  )
}

export default Books
