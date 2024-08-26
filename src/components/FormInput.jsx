import React, { useEffect, useRef, useState } from "react";
import { editTaskDetails, getTask, saveTask } from "../utils/helper";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { TaskBox } from "./TaskBox";
import { useFormStatus } from "react-dom";
const FormInput = () => {
  const [task, setTask] = useState([]);
  let [editTask, setEditTask] = useState("");
  const taskId = useRef("");
  const inputRef = useRef("");
  useEffect(() => {
    const storedTask = getTask();
    setTask(storedTask);
  }, []);
  const handleFormSubmit = (e) => {
    e.preventDefault();
  

    const edittedText = inputRef.current.trim();
    if (edittedText.length > 25) {
      return toast.error("Task should be brief & specific!");
    }
    if (taskId.current) {
      if (edittedText !== "" && taskId.current) {
        editTaskDetails(taskId.current, edittedText, setTask);
        toast.success("Task updated succefully!");
        inputRef.current = "";
        taskId.current = "";
      } else {
        toast.error("Nothing to update!");
      }
    } else {
      if (inputRef.current) {
        const taskData = {
          id: uuidv4(),
          name: inputRef.current,
        };
        setTask((previousTask) => [...previousTask, taskData]);
        saveTask([...task, taskData]);
        inputRef.current = "";
        toast.success("Task added succefully!");
      } else {
        toast.error("Input a task!");
      }
    }
  };
  const showEditTaskInfo = (id, task) => {
    setEditTask(task);
    taskId.current = id;
    inputRef.current = task;
  };
  const handleEditTask = (e) => {
    e.preventDefault();
    setEditTask(e.target.value);
    inputRef.current = e.target.value;
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className=" todo-changeList">
        <input
          type="text"
          name="task"
          value={inputRef.current}
          onChange={handleEditTask}
          placeholder={taskId.current ? "" : "Add task here"}
        />
        <button type="submit">
          {taskId.current ? "Update task" : "Add task"}
        </button>
      </form>
      {task.length >= 1 ? (
        <div className="todoContainer">
          <TaskBox
            taskes={task}
            setTask={setTask}
            showEditTaskInfo={showEditTaskInfo}
          />
        </div>
      ) : (
        <p className="noTask">Zero task today!</p>
      )}
    </>
  );
};
export default FormInput;
