import { useEffect, useState } from "react";
import api from "../api";
import { Link,useNavigate } from "react-router-dom";

export default function todo() {

    const [todo, setTodo] = useState([]);
    const [text, setText] = useState("");
    const [editId , setEditId] = useState(null);

    const nav = useNavigate();


    const fetchtodo = async () =>{
        const res = await api.get("/todo", {
        });
        setTodo(res.data);
    }

    useEffect(
        () => {
            fetchtodo();

    },[]);

    const savet = async () => {
        if (!text.trim()) return;

        if (editId) {
            
            await api.put(`/todo/${editId}`, { text });
            setEditId(null);
        } else {
            
            await api.post("/todo", { text });
        }

        setText("");
        fetchtodo();
    };

    const startEdit = (t) => {
        setText(t.text);     
        setEditId(t._id);    
    };



    const toggle = async (todo) => {
        await api.put(`/todo/${todo._id}`, { completed: !todo.completed }, {
        });
        fetchtodo();
    };

    const remove = async (id) => {
        await api.delete(`/todo/${id}`, {
        });
        fetchtodo();
    };

    const logout = () => {
        localStorage.removeItem("token");
        nav("/login");
    };


    return (

        <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">
            
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6">
            
            
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Todo List</h2>
                <button
                onClick={logout}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                Logout
                </button>
            </div>

           
            <div className="flex gap-2 mb-6">
                <input
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <button
                    onClick={savet}
                    className={`${editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"} text-white px-4 py-2 rounded-lg`}
                    >
                    {editId ? "Update" : "Add"}
                </button>


            </div>

            
            <ul className="space-y-3">
                {Array.isArray(todo) && todo.map(t => (
                <li
                    key={t._id}
                    className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg border"
                >
                    <span
                    onClick={() => toggle(t)}
                    className={`cursor-pointer ${t.completed ? "line-through text-gray-400" : ""}`}
                    >
                    {t.text}
                    </span>


                    <div className="flex gap-3">
                        <button
                        onClick={() => startEdit(t)}
                        className="text-blue-500 hover:text-blue-700 text-sm"
                        >
                        Edit
                        </button>

                        <button
                        onClick={() => remove(t._id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                        >
                        Remove
                        </button>
                    </div>
                </li>
                ))}
            </ul>

            </div>
        </div>
    );

}