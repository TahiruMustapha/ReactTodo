import toast from "react-hot-toast";
export const moveTaskDown = (taskId, setTask) => {
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
};

export const moveTaskUp = (index, setTask) => {
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
};
export const saveTask = (updatedTask) => {
  localStorage.setItem("task", JSON.stringify(updatedTask));
};
export const getTask = () => {
  const storedTask = JSON.parse(localStorage.getItem("task")) || [];
  return storedTask;
};
export const handleDeleteTask = (index, setTask) => {
  let storedTask = getTask();
  const confirmTaskRemoval = window.confirm(
    "Are you sure you want to remove this task?"
  );
  if (confirmTaskRemoval) {
    const newTask = storedTask.filter((_, taskIndex) => taskIndex !== index);
    saveTask(newTask);
    setTask(newTask);
    toast.success("Task removed succefully!");
  }
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

