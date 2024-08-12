import { saveTask } from "./SaveTask";

export const moveTaskDown = (taskId, setTask) => {
  let storedTask = JSON.parse(localStorage.getItem("task"));
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
};
