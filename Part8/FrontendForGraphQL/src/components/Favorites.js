const Favorites = ({show, setError, userResult, bookResult}) => {

  if (!show) {
    return null
  }

  if (bookResult.loading || userResult.loading) {
    return <div>Loading favorites...</div>;
  }

  if (bookResult.error || userResult.error) {
    setError('Error fetching favorites.');
    return null;
  }

  const books = bookResult.data.allBooks || [];
  const genresSet = new Set();

  books.forEach((book) => {
    book.genres.forEach((genre) => {
      genresSet.add(genre);
    });
  });

  const favoriteGenre = userResult.data?.me?.favoriteGenre; 
  const filteredBooks = books.filter((book) => book.genres.includes(favoriteGenre));

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <span style={{ fontWeight: "bold" }}>{favoriteGenre}</span>
        </div>

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
    </div>
  )
}

export default Favorites