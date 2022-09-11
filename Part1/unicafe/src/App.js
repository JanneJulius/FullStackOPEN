import { useState } from 'react'

const Headings = ({title}) => <h1>{title}</h1>

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text} {props.value}</td>
    </tr>
  ) 
}

const Statistics = ({props}) => {
  const sum = props.good+props.neutral+props.bad
  return(
    <table>
      <tbody>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad}/>
        <StatisticLine text="all" value ={sum}/>
        <StatisticLine text="average" value ={(props.good*1+props.bad*(-1))/sum}/>
        <StatisticLine text="positive" value ={100*props.good/sum}/>
      </tbody>
    </table>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const sum = (good+neutral+bad)

  const data = {
    "good": good,
    "neutral":neutral,
    "bad": bad
  }

  return (
    <>
      <Headings title = {"give feedback"}/> 
      <div className = "Buttons">
        <Button handleClick = {() => setGood(good +1)} text = {"good"}/>
        <Button handleClick = {() => setNeutral(neutral +1)} text = {"neutral"}/>
        <Button handleClick = {() => setBad(bad+1)} text = {"bad"}/>
      </div>
      <Headings title = {"statistics"}/> 
      <div className = "Statistics">
        {sum ===0
        ? <p>No feedback given</p>
        : <Statistics props = {data}/>
        }
      </div>
    </>    
  )
}

export default App