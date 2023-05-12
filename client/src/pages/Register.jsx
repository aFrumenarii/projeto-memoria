import React, { useState } from 'react'
import axios from 'axios'
export const Register = () => {

  const [inputs, setInputs] = useState({
    username:"",
    email:"",
    passwd:"",
  })

  const handleChange = e => {
    setInputs(prev => ({...prev, [e.target.name]:e.target.value}))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const res = await axios.post("http://localhost:5000/api/auth/registro", inputs)
      console.log("O usuário foi criado com sucesso")
    } catch (error) {
      console.log(`${error}`)
    }

  }
 
  console.log(inputs);


  return (
    <section>
      <h1>Registro</h1>
      <form>
        <input type="text" placeholder="usuário" name='username' onChange={handleChange} />
        <input type="email" placeholder="email" name='email' onChange={handleChange} />
        <input type="password" placeholder="palavra-chave" name='passwd' onChange={handleChange} />
        <button onClick={handleSubmit} type="submit">Enviar</button>
      </form>
    </section>
  )
}
