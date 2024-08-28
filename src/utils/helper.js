import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export const moveTaskDown = (taskId, setTask, setOpenActionId) => {
  let storedTask = getTask();
  if (storedTask) {
    const taskIndex = storedTask.findIndex((task) => task.id === taskId);
    if (taskIndex < storedTask.length - 1) {
      [storedTask[taskIndex + 1], storedTask[taskIndex]] = [
        storedTask[taskIndex],
        storedTask[taskIndex + 1],
      ];
      saveTask(storedTask);
      setTask(storedTask);
    }
  }
  setOpenActionId(null);
};

export const moveTaskUp = (index, setTask, setOpenActionId) => {
  let storedTask = getTask();

  if (storedTask) {
    const taskIndex = storedTask.findIndex((task) => task.id === index);
    if (taskIndex > 0) {
      [storedTask[taskIndex - 1], storedTask[taskIndex]] = [
        storedTask[taskIndex],
        storedTask[taskIndex - 1],
      ];
      saveTask(storedTask);
      setTask(storedTask);
    }
  }
  setOpenActionId(null);
};
export const closeModals = (setOpenDeleteDialog, setOpenActionId) => {
  setOpenDeleteDialog(false);
  setOpenActionId(null);
};
export const saveTask = (updatedTask, key = "task") => {
  localStorage.setItem(key, JSON.stringify(updatedTask));
};

export const getTask = (key = "task") => {
  const storedTask = JSON.parse(localStorage.getItem(key)) || [];
  return storedTask;
};
//receive name and save to storage
export const saveSingleTask = (singleTask) => {
  const storedTask = getTask();
  const task = {
    id: uuidv4(),
    name: singleTask,
  };
  storedTask.push(task);

  saveTask(storedTask);
};

export const handleDeleteTask = (index, setTask) => {
  let storedTask = getTask();
  const newTask = storedTask.filter((_, taskIndex) => taskIndex !== index);
  saveTask(newTask);
  setTask(newTask);
  toast.success("Task removed succefully!");
};
export const editTaskDetails = (index, newTodoTask, setTask) => {
  let storedTask = getTask();
  if (storedTask) {
    const taskIndex = storedTask.findIndex((task_s) => task_s.id === index);
    if (taskIndex !== -1) {
      storedTask[taskIndex].name = newTodoTask;
    }
    saveTask(storedTask);
    setTask(storedTask);
  }
};
