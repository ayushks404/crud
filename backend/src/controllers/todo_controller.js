import Todo from "../models/todo_model.js";

export const create = async (req, res) => {

  const text = req.body.text;          // get text from request
  const userId = req.user._id;         // get logged-in user's id

  const new_todo = new Todo({          // create new todo object
    text: text,
    user: userId
  });

  await new_todo.save();               // save to database

  res.status(201).json(new_todo);      // send saved todo back
};




export const getall = async (req, res) => {
  const user_id = req.user._id;                 // current user

  const todos = await Todo.find({ user: user_id }); // find only their todos

  res.json(todos); // send list back
};


export const update = async (req, res) => {


  const todo_id = req.params.id;      // id from URL
  const user_id = req.user._id;       // logged-in user

  // Find the todo that belongs to this user
  const todo = await Todo.findOne({ _id: todo_id, user: user_id });

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  // Update fields manually
  if (req.body.text !== undefined) {
    todo.text = req.body.text;
  }
  if (req.body.completed !== undefined) {
    todo.completed = req.body.completed;
  }

  await todo.save();  

  res.json(todo);
};


export const del = async (req, res) => {
  const todo_id = req.params.id;
  const user_id = req.user._id;

  const todo = await Todo.findOne({ _id: todo_id, user: user_id });

  if (!todo) {
    return res.status(404).json({ message: "todo not found" });
  }

  await todo.deleteOne(); 

  res.json({ message: "deleted succ" });
};
