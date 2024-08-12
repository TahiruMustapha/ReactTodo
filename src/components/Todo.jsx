import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const Todo = () => {
  let storedTask = JSON.parse(localStorage.getItem("task"));
  const [newTask, setNewTask] = useState("");
  const [task, setTask] = useState([]);
  let [editTask, setEditTask] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const storedTask = JSON.parse(localStorage.getItem("task")) || [];
    setTask(storedTask);
  }, []);
  const saveTask = (updatedTask) => {
    localStorage.setItem("task", JSON.stringify(updatedTask));
    setTask(updatedTask);
  };

  const handleDelete = (index) => {
    const newTask = storedTask.filter((_, taskIndex) => taskIndex !== index);
    saveTask(newTask);
  };

  const functionToMoveTaskUp = (index) => {
    if (storedTask) {
      const taskIndex = storedTask.findIndex((task) => task.id === index);
      if (taskIndex > 0) {
        [storedTask[taskIndex - 1], storedTask[taskIndex]] = [
          storedTask[taskIndex],
          storedTask[taskIndex - 1],
        ];
        saveTask(storedTask);
      }
    }
  };

  const functionToMoveTaskDown = (index) => {
    if (storedTask) {
      const taskIndex = storedTask.findIndex((task) => task.id === index);
      if (taskIndex < storedTask.length - 1) {
        [storedTask[taskIndex + 1], storedTask[taskIndex]] = [
          storedTask[taskIndex],
          storedTask[taskIndex + 1],
        ];
        saveTask(storedTask);
      }
    }
  };
  const handleAddTask = (e) => {
    setNewTask(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return alert("Input a task!");
    if (newTask.trim().length > 25) {
      return alert("Task should be brief & specific!");
    }

    const taskData = {
      id: uuidv4(),
      name: newTask,
    };
    setTask((previousTask) => [...previousTask, taskData]);
    localStorage.setItem("task", JSON.stringify([...task, taskData]));
    setNewTask("");
  };
  const showEditTaskInfo = (id, task) => {
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
      return alert("Task should be brief & specific!");
    }
    if (edittedText !== "" && editingId) {
      editTaskFunction(editingId, edittedText);
      setEditTask("");
    } else {
      alert("Input something!");
    }
  };
  function editTaskFunction(index, newTodoTask) {
    if (storedTask) {
      const taskIndex = storedTask.findIndex((task_s) => task_s.id === index);
      if (taskIndex !== -1) {
        storedTask[taskIndex].name = newTodoTask;
      }
      saveTask(storedTask);
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
                <span onClick={() => functionToMoveTaskUp(task.id)}>Up</span>

                <span onClick={() => functionToMoveTaskDown(task.id)}>
                  Down
                </span>
                <span onClick={() => handleDelete(index)}>Remove</span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Zero task today!</p>
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
