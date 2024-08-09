import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const Todo = () => {
  let storedTask = JSON.parse(localStorage.getItem("task")) || [];
  const [newTask, setNewTask] = useState("");
  const [task, setTask] = useState([]);
  let [editTask, setEditTask] = useState("");
  const [editingId, setEditingId] = useState(null);

  // useEffect(() => {
  //   const storedTask = JSON.parse(localStorage.getItem("task"));
  //   // setTask(storedTask);
  // }, []);
  
  const handleDelete = (index) => {
    const tasks = JSON.parse(localStorage.getItem("task"));
    const newTask = tasks.filter((_, taskIndex) => taskIndex !== index);
    // setTask(newTask);
    localStorage.setItem("task", JSON.stringify(newTask));
  };

  const functionToMoveTaskUp = (index) => {
    const tasks = JSON.parse(localStorage.getItem("task"));
    if (tasks) {
      const taskIndex = tasks.findIndex((task) => task.id === index);
      if (taskIndex > 0) {
        [tasks[taskIndex - 1], tasks[taskIndex]] = [
          tasks[taskIndex],
          tasks[taskIndex - 1],
        ];
        // setTask(tasks);
        localStorage.setItem("task", JSON.stringify(tasks));
      }
    }
  };

  const functionToMoveTaskDown = (index) => {
    const tasks = JSON.parse(localStorage.getItem("task"));
    if (tasks) {
      const taskIndex = tasks.findIndex((task) => task.id === index);
      if (taskIndex < tasks.length - 1) {
        [tasks[taskIndex + 1], tasks[taskIndex]] = [
          tasks[taskIndex],
          tasks[taskIndex + 1],
        ];
        // setTask(tasks);
        localStorage.setItem("task", JSON.stringify(tasks));
      }
    }
  };
  const handleAddTask = (e) => {
    setNewTask(e.target.value);
  };
  const handleFormSUbmit = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return alert("Input a task!");
    const taskData = {
      id: uuidv4(),
      name: newTask,
    };
    // setTask((previousTask) => [...previousTask, taskData]);
    localStorage.setItem("task", JSON.stringify([...storedTask, taskData]));
    setNewTask("");
  };
  const showEditTaskInfo = (id, task) => {
    setEditingId(id);
    setEditTask(task);
    // console.log(id);
  };

  const handleEditTask = (e) => {
    e.preventDefault();
    let value = e.target.value;
    setEditTask(value);
  };
  const updateTaskFunction = () => {
    const edittedText = editTask.trim();
    if (edittedText !== "" && editingId) {
      editTaskFunction(editingId, edittedText);
    } else {
      alert("Input something!");
    }
  };
  function editTaskFunction(index, newTodoTask) {
    const tasks = JSON.parse(localStorage.getItem("task"));
    if (tasks) {
      const taskIndex = tasks.findIndex((task_s) => task_s.id === index);
      if (taskIndex !== -1) {
        tasks[taskIndex].name = newTodoTask;
      }
      localStorage.setItem("task", JSON.stringify(tasks));
    }
  }

  return (
    <div className="todo">
      <div>
        <form className=" todo-changeList">
          <input type="text" onChange={handleEditTask} value={editTask} />
          <button onClick={updateTaskFunction} type="default">
            Update Task
          </button>
        </form>
      </div>
      <div className="todoContainer">
        {storedTask.map((task, index) => (
          <div key={index} className="taskBox">
            <li
              key={task.id}
              onClick={() => showEditTaskInfo(task.id, task.name)}
              className="task"
            >
              {task.name}
            </li>
            <p className="taskActions">
              <span onClick={() => functionToMoveTaskUp(task.id)}>Up</span>

              <span onClick={() => functionToMoveTaskDown(task.id)}>Down</span>
              <span onClick={() => handleDelete(index)}>Remove</span>
            </p>
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={handleFormSUbmit} className="todo-addTask">
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
