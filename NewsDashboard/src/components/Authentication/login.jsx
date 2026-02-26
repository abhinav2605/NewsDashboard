import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit =(e)=>{
        e.preventDefault();
        if(username == "admin" && password == "1234")
        {
            navigate('/dashboard');
        }
    }

    return (<div className='login'>
        <h1>Login</h1>
        <input type="text" placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)} /><br/>
        <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} /><br/>
        <button type='submit' onClick={handleSubmit}>Login</button>
        </div>)
}