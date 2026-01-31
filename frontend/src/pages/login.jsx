import { useState } from "react";
import {Link , useNavigate} from "react-router-dom";
import api from "../api";


export default function Login(){
    const [form , setForm] = useState({email:"" , password: ""});
    const navigate = useNavigate();
    

    const submit = async () =>{
        const res = await api.post("/auth/login", form);
        localStorage.setItem("token", res.data.token);
        navigate("/todo");
    };

    return (
    <div>
        <h2>Login</h2>
        <input 
            placeholder="Email" 
            onChange=
            {e => setForm({
                ...form, email: e.target.value
                })
            } 
        />
        <input 
            type="password" 
            placeholder="Password" 
            onChange=
            {e => setForm({
                ...form, password: e.target.value 
                })
            }
        />
        <button onClick={submit}>Login</button>
        <p>No account? <Link to="/register">Register</Link></p>
    </div>
  );
}