import { useState } from "react";
import {Link , useNavigate} from "react-router-dom";
import api from "../api";


export default function Login(){

    const [form , setForm] = useState({email:"" , password: ""});
    const nav = useNavigate();
    

    const submit = async () =>{
        
        const res = await api.post("/auth/login", form);
        localStorage.setItem("token", res.data.token);
        nav("/todo");
        
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

            <input
                type="email"
                placeholder="Email"
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="password"
                placeholder="Password"
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                onClick={submit}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
                Login
            </button>

            <p className="text-center mt-4 text-sm">
                No account?{" "}
                <Link to="/register" className="text-blue-600 hover:underline">
                Register
                </Link>
            </p>
            </div>
        </div>
    );

}