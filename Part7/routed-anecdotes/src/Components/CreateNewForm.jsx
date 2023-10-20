import { useNavigate } from 'react-router-dom'
import  { useField } from '../hooks/index'


export const CreateNew = ({addNew, showNotification}) => {

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value, 
      author: author.value, 
      info: info.value, 
      votes: 0,
    })

    showNotification(`New anecdote ${content.value} created`);
    navigate('/');
  }

  const handleReset = () => {
    content.onChange({ target: { value: '' } });
    author.onChange({ target: { value: '' } });
    info.onChange({ target: { value: '' } });
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <div>
        content
        <input  {...content} /> 
      </div>
      <div>
        author
        <input  {...author} /> 
      </div>
      <div>
        url for more info
        <input  {...info} /> 
      </div>
      <button onClick={handleSubmit}>create</button>
      
      <button onClick={handleReset}>reset</button>      
    </div>
  )
}
