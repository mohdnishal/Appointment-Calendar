import React, { useState } from 'react'
import {Calendar} from 'lucide-react'
import './LoginForm.css'
import {CREDENTIALS} from '../../data/data'

function LoginForm({setIsAuthenticated}) {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState('')

    const handleLogin=()=>{
        if(email===CREDENTIALS.email && password===CREDENTIALS.password)
        {
            localStorage.setItem('login',JSON.stringify({email,password}))
            setIsAuthenticated(true)
            setError('')
        }
        else{
            setError('Invalid Credential')
        }
    }
  return (
    <div className='login-container'>
        <div className='login-box'>
            <div className='login-header'>
                <Calendar className='calendar-icon'/>
                    <h1>Clinic Calendar</h1>
            </div>
            <div className='login-form'>
                <div>
                    <label>Email</label>
                    <input type='email' className='' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email' required/>
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' className='' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' required/>
                </div>
                {error && <p className="error-msg">{error}</p>}
                <button type='button' onClick={handleLogin} className='login-button'>Sign In</button>
            </div>
        </div>
        
    </div>
  )
}

export default LoginForm