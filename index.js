const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

// const dbUrl = "mongodb://127.0.0.1:27017/TodoList";

// mongoose.connect(dbUrl);

require("dotenv").config();

const connectDB = require("./ConnectMongo");
connectDB();

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

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Right now the Server is Running on port: ${PORT}`)
);
