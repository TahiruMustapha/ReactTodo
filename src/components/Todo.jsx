import React, { useEffect, useState } from "react";

const Todo = () => {
  const [newTask, setNewTask] = useState("");
  const [task, setTask] = useState([]);
  const [editTask, setEditTask] = useState("");
  // const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("task")) {
      const storedTask = JSON.parse(localStorage.getItem("task"));
      setTask(storedTask);
    }
  }, []);

  const handleDelete = (index) => {
    const newTask = task.filter((_, taskIndex) => taskIndex !== index);
    setTask(newTask);
    localStorage.setItem("task", JSON.stringify(newTask));
  };

  const functionToMoveTaskUp = (index) => {
    if (index > 0) {
      const updatedTask = [...task];
      [updatedTask[index], updatedTask[index - 1]] = [
        updatedTask[index - 1],
        updatedTask[index],
      ];
      setTask(updatedTask);
      localStorage.setItem("task", JSON.stringify(updatedTask));
    }
  };
  const functionToMoveTaskDown = (index) => {
    if (index < task.length - 1) {
      const updatedTask = [...task];
      [updatedTask[index], updatedTask[index + 1]] = [
        updatedTask[index + 1],
        updatedTask[index],
      ];
      setTask(updatedTask);
      localStorage.setItem("task", JSON.stringify(updatedTask));
    }
  };
  const handleAddTask = (e) => {
    setNewTask(e.target.value);
  };
  let editIndex = -1;
  const handleFormSUbmit = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return alert("Input a task!");
    setTask((previousTask) => [...previousTask, newTask.trim()]);
    localStorage.setItem("task", JSON.stringify([...task, newTask]));
    setNewTask("");
  };
  const showEditTaskInfo = (index, task) => {
    setEditingId(index);
    setEditTask(task);
  };

  const handleEditTask = (e) => {
    // setEditTaskInput(e.target.value);
    let value = e.target.value;
    setEditTask(value);
  };
  const updateTaskFunction = () => {
    const edittedText = editTask.trim();
    if (edittedText !== "" && editingId >= 0) {
      editTaskFunction(editingId, edittedText);
      // localStorage.setItem("task", JSON.stringify(edittedText));
      // editTask = "";
    } else {
      alert("Input something!");
    }
  };
  function editTaskFunction(index, newTodoTask) {
    const tasks = JSON.parse(localStorage.getItem("task"));
    if (tasks && index < tasks.length) {
      tasks[index] = newTodoTask;
      localStorage.setItem("task", JSON.stringify(tasks));
    }
  }
  
  return (
    <div className="todo">
      <div>
        <form className=" todo-changeList">
          <input type="text" onChange={handleEditTask} value={editTask} />
          <button type="default" onClick={updateTaskFunction}>
            Update
          </button>
        </form>
      </div>
      <div className="todoContainer">
        {task.map((task, index) => (
          <div key={index} className="taskBox">
            <li onClick={() => showEditTaskInfo(index, task)} className="task">
              {task}
            </li>
            <p className="taskActions">
              <span onClick={() => functionToMoveTaskUp(index)}>Up</span>

              <span onClick={() => functionToMoveTaskDown(index)}>Down</span>
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
