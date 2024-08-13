import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Actions } from "./Actions";
import toast from "react-hot-toast";
import InputTask from "./InputTask";
import { useRef } from "react";
import {
  editTaskDetails,
  handleDeleteTask,
  moveTaskDown,
  moveTaskUp,
} from "../utils/helpers/helper";

const Todo = () => {
  const [task, setTask] = useState([]);
  let [editTask, setEditTask] = useState("");
  const editTaskRef = useRef("");
  const taskId = useRef("");
  useEffect(() => {
    const storedTask = JSON.parse(localStorage.getItem("task")) || [];
    setTask(storedTask);
  }, []);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let newTask = formData.get("addTask");
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
    e.currentTarget.reset();
    toast.success("Task added succefully!");
  };
  const showEditTaskInfo = (id, task) => {
    setEditTask(task);
    taskId.current = id;
    editTaskRef.current = task;
  };
  const handleEditTask = (e) => {
    e.preventDefault();
    editTaskRef.current = e.target.value;
    setEditTask(editTaskRef.current);
  };
  const updateTaskFunction = (e) => {
    e.preventDefault();

    const edittedText = editTaskRef.current.trim();
    if (edittedText.length > 25) {
      return toast.error("Task should be brief & specific!");
    }
    if (edittedText !== "" && taskId.current) {
      editTaskDetails(taskId.current, edittedText, setTask);
      toast.success("Task updated succefully!");
      setEditTask("");
    } else {
      toast.error("Nothing to update!");
    }
  };
  return (
    <div className="todo">
      <div>
        <InputTask
          inputName={"editTask"}
          onSubmit={updateTaskFunction}
          inputValue={editTask}
          onChangeText={handleEditTask}
          buttonText={"Update Task"}
          placeholderText={""}
        />
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
                  <Actions>Up</Actions>
                </span>

                <span onClick={() => moveTaskDown(task.id, setTask)}>
                  <Actions>Down</Actions>
                </span>
                <span onClick={() => handleDeleteTask(index, setTask)}>
                  <Actions>Remove</Actions>
                </span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="noTask">Zero task today!</p>
      )}
      <div>
        <InputTask
          inputName={"addTask"}
          onSubmit={handleFormSubmit}
          // inputValue={editTask}
          // onChangeText={handleEditTask}
          buttonText={"Add Task"}
          placeholderText={" Write task"}
        />
      </div>
    </div>
  );
};

export default Todo;
