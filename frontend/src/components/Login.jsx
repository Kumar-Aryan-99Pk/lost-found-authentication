import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      nav("/dashboard");
    } catch (err) {
      console.log(err); // 👈 ADD THIS FOR DEBUG
      alert("Invalid credentials");
    }
  };

  return (
  <div className="container">
    <div className="card">
      <h2>Login</h2>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />

      <button onClick={login}>Login</button>

      <p className="link" onClick={() => nav("/register")}>
        Create Account
      </p>
    </div>
  </div>
);
}