import { saveTask } from "./SaveTask";

export const editTaskDetails = (index, newTodoTask, setTask) => {
  let storedTask = JSON.parse(localStorage.getItem("task"));

  if (storedTask) {
    const taskIndex = storedTask.findIndex((task_s) => task_s.id === index);
    if (taskIndex !== -1) {
      storedTask[taskIndex].name = newTodoTask;
    }
    saveTask(storedTask);
    setTask(storedTask);
  }
};
