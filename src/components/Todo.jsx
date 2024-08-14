import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import FormInput from "./FormInput";
import { editTaskDetails, getTask } from "../utils/helper";
import { TaskBox } from "./TaskBox";
const Todo = () => {
  const [task, setTask] = useState([]);
  let [editTask, setEditTask] = useState("");
  const taskId = useRef("");
  useEffect(() => {
    const storedTask = getTask();
    setTask(storedTask);
  }, []);
  const AddOrUpdateTak = (e) => {
    const edittedText = editTask.trim();
    if (edittedText.length > 25) {
      return toast.error("Task should be brief & specific!");
    }
    e.preventDefault();
    if (taskId.current) {
      if (edittedText !== "" && taskId.current) {
        editTaskDetails(taskId.current, edittedText, setTask);
        toast.success("Task updated succefully!");
        setEditTask("");
        taskId.current = "";
      } else {
        toast.error("Nothing to update!");
      }
    } else {
      const taskData = {
        id: uuidv4(),
        name: editTask,
      };
      setTask((previousTask) => [...previousTask, taskData]);
      localStorage.setItem("task", JSON.stringify([...task, taskData]));
      setEditTask("");
      toast.success("Task added succefully!");
    }
  };
  const showEditTaskInfo = (id, task) => {
    setEditTask(task);
    taskId.current = id;
  };
  const handleEditTask = (e) => {
    e.preventDefault();
    setEditTask(e.target.value);
  };
  return (
    <div className="todo">
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
      <div>
        <FormInput
          inputValue={editTask}
          onChangeText={handleEditTask}
          inputName={"addTask"}
          onSubmit={AddOrUpdateTak}
          buttonText={taskId.current ? "update task" : "Add task"}
          placeholderText={"Write task"}
        />
      </div>
    </div>
  );
};
export default Todo;
