import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const obj = { content, votes: Number(0) }
  const response = await axios.post(baseUrl, obj)
  return response.data
}

const likeAnecdote = async (anecdote) => {
  const { id, votes } = anecdote;

  const response = axios.put(
    `${baseUrl}/${id}`, 
    { ...anecdote, votes: votes + 1 })

  return response
}

export default { getAll, createNew, likeAnecdote }