import toast from "react-hot-toast";
import { saveTask } from "./SaveTask";

export const handleDeleteTask = (index, setTask) => {
  let storedTask = JSON.parse(localStorage.getItem("task"));
  const confirmTaskRemoval = window.confirm("Are you sure you want to remove this task?");
  if (confirmTaskRemoval) {
    const newTask = storedTask.filter((_, taskIndex) => taskIndex !== index);
    saveTask(newTask);
    setTask(newTask);
    toast.success("Task removed succefully!");
  }
};
