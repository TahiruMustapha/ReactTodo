import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Actions } from "./Actions";
import toast from "react-hot-toast";
import { handleDeleteTask } from "../utils/helpers/DeleteTask";
import { moveTaskUp } from "../utils/helpers/MoveTaskUp";
import { moveTaskDown } from "../utils/helpers/MoveTaskDown";
import { editTaskDetails } from "../utils/helpers/EditTask";
import InputTask from "./InputTask";

const Todo = () => {
  const [newTask, setNewTask] = useState("");
  const [task, setTask] = useState([]);

  let [editTask, setEditTask] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const storedTask = JSON.parse(localStorage.getItem("task")) || [];
    setTask(storedTask);
  }, []);

  const handleAddTask = (e) => {
    setNewTask(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return toast.error("Input a task!");
    if (newTask.trim().length > 25) {
      return toast.error("Task should be brief & specific!");
    }
    const taskData = {
      id: uuidv4(),
      name: newTask,
    };
    setTask((previousTask) => [...previousTask, taskData]);
    localStorage.setItem("task", JSON.stringify([...task, taskData]));
    setNewTask("");
    toast.success("Task added succefully!");
  };
  const showEditTaskInfo = ({ id, task }) => {
    setEditingId(id);
    setEditTask(task);
  };
  const handleEditTask = (e) => {
    e.preventDefault();
    let value = e.target.value;
    setEditTask(value);
  };
  const updateTaskFunction = (e) => {
    e.preventDefault();
    const edittedText = editTask.trim();
    if (edittedText.length > 25) {
      return toast.error("Task should be brief & specific!");
    }
    if (edittedText !== "" && editingId) {
      editTaskDetails(editingId, edittedText, setTask);
      toast.success("Task updated succefully!");
      setEditTask("");
    } else {
      toast.error("Nothing to update!");
    }
  };
  return (
    <div className="todo">
      <div>
        <form className=" todo-changeList">
          {/* <InputTask value = {editTask} onChange={handleEditTask} /> */}
          <input type="text" onChange={handleEditTask} value={editTask} />
          <button onClick={updateTaskFunction} type="default">
            Update Task
          </button>
        </form>
      </div>
      {task.length >= 1 ? (
        <div className="todoContainer">
          {task.map((task, index) => (
            <div key={index} className="taskBox">
              <li
                key={task.id}
                onClick={() => showEditTaskInfo(task.id, task.name)}
                className="task"
              >
                {task.name}
              </li>
              <p className="taskActions">
                <span onClick={() => moveTaskUp(task.id, setTask)}>
                  {" "}
                  <Actions>Up</Actions>{" "}
                </span>

                <span onClick={() => moveTaskDown(task.id, setTask)}>
                  <Actions>Down</Actions>{" "}
                </span>
                <span onClick={() => handleDeleteTask(index, setTask)}>
                  {" "}
                  <Actions>Remove</Actions>{" "}
                </span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="noTask">Zero task today!</p>
      )}

      <div>
        <form onSubmit={handleFormSubmit} className="todo-addTask">
          <input
            type="text"
            onChange={handleAddTask}
            value={newTask}
            placeholder=" Write task"
          />
          <button type="submit">Add Item</button>
        </form>
      </div>
    </div>
  );
};

export default Todo;
