import { useState } from 'react'
import { useSignUp } from '../../hooks/useSignUp'
import './signup.css'



export default function Signup() {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [displayName,setName]=useState('')
  const {error, isPending, signup }=useSignUp()

  const handleSubmit=(e)=>{
    e.preventDefault();
    signup(email,password,displayName)
  }


  return (
    <form className='signup-form' onSubmit={handleSubmit} >
      <h2>signup form</h2>
      <label>
        <span>email:</span>
        <input type="email" onChange={(e)=> { setEmail(e.target.value)}} value={email}  />
      </label>
      <label>
        <span>password:</span>
        <input type="password" onChange={(e)=> { setPassword(e.target.value)}} value={password}/>
      </label>
      <label>
        <span>username:</span>
        <input type="text" onChange={(e)=> { setName(e.target.value)}} value={displayName}/>
      </label>

      {!isPending &&  <button className='btn' >SignUp</button>}
      {isPending &&  <button className='btn' disabled >Loading</button>}
    </form>
  )
}
