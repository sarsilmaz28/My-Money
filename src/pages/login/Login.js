import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

import './login.css'


export default function Login() {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {error,isPending, login}= useLogin()

  const handleSubmit=(e)=>{
    e.preventDefault();
    login(email,password)
  }

  return (
    <form className='login-form' onSubmit={handleSubmit} >
      <h2>login form</h2>
      <label>
        <span>email:</span>
        <input type="email" onChange={(e)=> { setEmail(e.target.value)}} value={email}  />
      </label>
      <label>
        <span>password:</span>
        <input type="password" onChange={(e)=> { setPassword(e.target.value)}} value={password}/>
      </label>

      {!isPending && <button className='btn' >Login</button>}
      {isPending && <button className='btn' disabled >Loading</button>}
      {error && <p>{error}</p>}
    </form>
  )
}
