import { useState } from 'react'

const Headings = ({title}) => <h1>{title}</h1>


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)


  const selectRandom = () => {
    const randomInt = (min, max) => { 
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
    setSelected(randomInt(0, anecdotes.length-1))
  }

  const vote = () => {
    const copy = { ...points }
    copy[selected] +=1
    setPoints(copy)

    const arr = Object.values(copy);
    const max = Math.max(...arr);

    setMostVotes(arr.indexOf(max))
  }

  return (
    <>
      <Headings title = {"Anecdote of the day"}/> 
      <table>
        <tbody>
          <tr><td>{anecdotes[selected]}</td></tr>
          <tr><td>has {points[selected]} votes</td></tr>
        </tbody>
      </table>

      <div>
        <button onClick={vote}>vote</button>
        <button onClick={selectRandom}>next anecdote</button>
      </div>

      <Headings title = {"Anecdote with most votes"}/> 
      <table>
        <tbody>
          <tr><td>{anecdotes[mostVotes]}</td></tr>
          <tr><td>has {points[mostVotes]} votes</td></tr>
        </tbody>
      </table>
    </>
  )
}

export default App