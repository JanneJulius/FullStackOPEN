import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'


const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('JanneJulius')
  const [password, setPassword] = useState('secret')

  const [ login, result ] = useMutation(LOGIN, { // eslint-disable-line
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('books-user-token');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, [setToken]);

  const submit = async (event) => {
    event.preventDefault();

    const response = await login({ variables: { username, password } });

    if (response.data) {
      const token = response.data.login.value;
      setToken(token);
      localStorage.setItem('books-user-token', token);
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm