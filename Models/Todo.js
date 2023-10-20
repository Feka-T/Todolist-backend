const mongoos = require("mongoose");

const TodoSchema = new mongoos.Schema({
  todo_task: {
    type: String,
    required: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },

  not_completed: {
    type: Boolean,
    default: true,
  },
});

const TodoModel = mongoos.model("todolist", TodoSchema);
module.exports = TodoModel;
