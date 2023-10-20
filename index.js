const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

const dbUrl = "mongodb://127.0.0.1:27017/TodoList";
// const dbUrl =
//   "mongodb+srv://todolist:ny2wRq5ar4Q9uFM0@todolist.8hwobd9.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbUrl);

app.get("/get", (_req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate({ _id: id }, { completed: true })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

app.put("/undone/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate({ _id: id }, { completed: false })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

app.post("/add", (req, res) => {
  const todo_task = req.body.todo_task;
  TodoModel.create({ todo_task: todo_task })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

const port = process.env.PORT || 3001;
app.listen(port, () =>
  console.log(`Right now the Server is Running on port: ${port}`)
);
