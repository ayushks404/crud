import { useState } from "react";
import api from "../api";

import {Link , useNavigate} from "react-router-dom";


export default function register (){

    const [form , setForm] = useState({name: "",email:"",password:"" });
    const nav = useNavigate();

    const submit = async () =>{
        const res = await api.post("/auth/register" , form);
        
        localStorage.setItem("token",res.data.token);
        nav("/todo");  
    };

    return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={submit}>Register</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );

};