export const Anecdote = ({ anecdote, vote }) => {

  const handleClick = () => {
    vote(anecdote.id)
  }
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>{anecdote.author}</div>
      <div>{anecdote.info}</div>
      <div>
        <strong>{anecdote.votes }</strong>
        <button onClick={handleClick}>Vote</button>
      </div>
    </div>
  )
}