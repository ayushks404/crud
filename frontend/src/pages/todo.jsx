import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function todo() {
    const [todo, setTodo] = useState([]);
    const [text, setText] = useState("");
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

    const addTodo = async () => {
        await api.post("/todo", { text }, {
        });
        setText("");
        fetchtodo();
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
        <div>
            <h2>My Todo List</h2>
            <button onClick={logout}>Logout</button>

            <div>
                <input value={text} onChange={e => setText(e.target.value)} placeholder="New task" />
                <button onClick={addTodo}>Add</button>
            </div>

            <ul>
                {Array.isArray(todo) && todo.map(t => (
                    <li key={t._id}>
                        <span
                            onClick={() => toggle(t)}
                            style={{ textDecoration: t.completed ? "line-through" : "none", cursor: "pointer" }}
                        >
                            {t.text}
                        </span>
                        <button onClick={() => remove(t._id)}>remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}