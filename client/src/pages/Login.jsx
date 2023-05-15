import React, { useState } from 'react'
import axios from 'axios'
import styles from './Login.module.css'

export const Login = () => {
  const [inputs, setInputs] = useState({
    email:"",
    passwd:"",
  })

  const [mensagens, setMensagem] = useState('')

  const handleChange = e => {
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }

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
        <input type="email" name='email' onChange={handleChange} placeholder="email" />
        <input type="password" name='passwd' onChange={handleChange} placeholder="palavra-chave" />
        <p>{mensagens}</p>
        {mensagens === 'usuário foi autenticado com sucesso' ? console.log(true) : console.log(false) }
        <button onClick={handleClick} type="submit">Enviar</button>
      </form>
    </section>
  )
}
