
import React, { useEffect, useRef, useState } from "react";
import { editTaskDetails, getTask, saveTask } from "../utils/helper";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { TaskBox } from "./TaskBox";
const FormInput = () => {
  const [task, setTask] = useState([]);
  const [getTaskId, setGetTaskId] = useState(null);
  const taskId = useRef("");
  const inputRef = useRef(null);
  useEffect(() => {
    const storedTask = getTask();
    setTask(storedTask);
  }, []);
  let newId = "";
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const edittedText = inputRef.current.value.trim();
    if (edittedText.length > 25) {
      return toast.error("Task should be brief & specific!");
    }
    if (taskId.current) {
      if (edittedText !== "" && taskId.current) {
        editTaskDetails(taskId.current, edittedText, setTask);
        toast.success("Task updated succefully!");
        inputRef.current.value = "";
        taskId.current = "";
      } else {
        toast.error("Nothing to update!");
      }
    } else {
      if (inputRef.current.value) {
        const taskData = {
          id: uuidv4(),
          name: inputRef.current.value,
        };
        setTask((previousTask) => [...previousTask, taskData]);
        saveTask([...task, taskData]);
        inputRef.current.value = "";
        toast.success("Task added succefully!");
      } else {
        toast.error("Input a task!");
      }
    }
  };
  const showEditTaskInfo = (id, task) => {
    taskId.current = id;
    // setGetTaskId(id);
    inputRef.current.value = task;
  };
  return (
    <>
      <form onSubmit={handleFormSubmit} className=" todo-changeList">
        <input
          type="text"
          name="task"
          ref={inputRef}
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
