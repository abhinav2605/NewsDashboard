import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { supabase } from "../../lib/supabase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      console.log("Login Success:", data);

      // session user
      const user = data?.user;

      if (!user) {
        alert("User not found");
        return;
      }

      // Optional: fetch role from profiles table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.log(profileError.message);
      }

      if (profile?.role === "admin") {
        alert("Welcome Admin");
        // navigate("/admin-dashboard");
      } else {
        alert("Welcome User");
        navigate("/dashboard");
      }

    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;


// export default function Login() {
//     const navigate = useNavigate();
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const handleSubmit =(e)=>{
//         e.preventDefault();
//         if(username == "admin" && password == "1234")
//         {
//             navigate('/dashboard');
//         }
//     }

//     return (<div className='login'>
//         <h1>Login</h1>
//         <input type="text" placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)} /><br/>
//         <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} /><br/>
//         <button type='submit' onClick={handleSubmit}>Login</button>
//         </div>)
// }