import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";
interface Task {
  id: string;
  name: string;
}
type SetTaskType = Dispatch<SetStateAction<Task[]>>;
type SetOpenActionId = Dispatch<SetStateAction<string | null>>
type SetOpenDeleteDialog = React.Dispatch<React.SetStateAction<boolean>>
export const moveTaskDown = (
  taskId: string,
  setTask: SetTaskType,
  setOpenActionId: SetOpenActionId
): void => {
  let storedTask = getTask();
  if (storedTask) {
    const taskIndex = storedTask.findIndex((task: Task) => task.id === taskId);
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
export const moveTaskUp = (index:string, setTask:SetTaskType, setOpenActionId:SetOpenActionId) => {
  let storedTask = getTask();
  if (storedTask) {
    const taskIndex = storedTask.findIndex((task:Task) => task.id === index);
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
export const closeModals = (setOpenDeleteDialog:SetOpenDeleteDialog, setOpenActionId:SetOpenActionId) => {
  setOpenDeleteDialog(false);
  setOpenActionId(null);
};
export const saveTask = (updatedTask: Task[], key: string = "task"): void => {
  localStorage.setItem(key, JSON.stringify(updatedTask));
};

export const getTask = (key: string = "task"): Task[] => {
  const storedTask = JSON.parse(localStorage.getItem(key) || '[]') as Task[];
  return storedTask;
};


export const handleDeleteTask = (index:number, setTask:SetTaskType) => {
  let storedTask = getTask();
  const newTask = storedTask.filter((_, taskIndex) => taskIndex !== index);
  saveTask(newTask);
  setTask(newTask);
  toast.success("Task removed succefully!");
};
export const editTaskDetails = (taskId: string, newTodoTask: string, setTask: SetTaskType): void => {
  let storedTask = getTask();
  if (storedTask) {
    const taskIndex = storedTask.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      // Update the name of the task at the specified index
      storedTask[taskIndex] = { ...storedTask[taskIndex], name: newTodoTask };
      
      // Save updated tasks
      saveTask(storedTask);
      
      // Update the state
      setTask(storedTask);
    }
  }
};
