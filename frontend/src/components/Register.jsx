import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API;

export default function Register() {
  const [form, setForm] = useState({});
  const nav = useNavigate();

  const register = async () => {
    console.log("FORM:", form); // 👈 DEBUG

    try {
      await axios.post(`${BASE_URL}/api/auth/register`, form);
      alert("Registered!");
      nav("/");
    } catch (err) {
      console.log(err); // 👈 DEBUG
      alert("Email already exists");
    }
  };

  return (
  <div className="container">
    <div className="card">
      <h2>Register</h2>

      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
      <input placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})} />

      <button onClick={register}>Register</button>
    </div>
  </div>
);
}