import React, { useState } from 'react'
import axios from 'axios'
import styles from './Login.module.css'

export const Login = () => {
  const [inputs, setInputs] = useState({
    username:"",
    passwd:"",
  })

  const [mensagens, setMensagem] = useState('')

  const handleChange = e => {
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  let mensagem = ''

  const handleClick = async e => {
    try {
      e.preventDefault()
      await axios.post('http://localhost:5000/api/auth/login', inputs).then(response =>{
        setMensagem(response.data.message)
      });
    }catch (error) {
      setMensagem(error.response.data.message)
    } 
  }

  return (
    <section>
      <h1>Login</h1>
      <form>
        <input type="text" name='username' onChange={handleChange} placeholder="usuário ou email" />
        <input type="password" name='passwd' onChange={handleChange} placeholder="palavra-chave" />
        <p>{mensagens}</p>
        <button onClick={handleClick} type="submit">Enviar</button>
      </form>
    </section>
  )
}
