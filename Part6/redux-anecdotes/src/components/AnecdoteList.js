import { useDispatch, useSelector } from 'react-redux'
import { likeAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const anecdotes = useSelector( ({ anecdotes }) => anecdotes)
  const filter = useSelector(({filter}) => filter)
  const dispatch = useDispatch()

  const vote = async (a) => {
    dispatch(likeAnecdote(a))
    dispatch(setNotification(`Voted anecdote: ${a.content}`, 5000))

  }

  return(
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
      .slice()
      .filter((a) => { return filter !== null ? a.content.toLowerCase().includes(filter.toLowerCase()) : true})
      .sort((a, b) => b.votes - a.votes)
      .map(a =>
        <Anecdote
          key={a.id}
          anecdote={a}
          handleClick={() => vote(a)}
        />
      )}
    </div>
  )
}

export default Anecdotes