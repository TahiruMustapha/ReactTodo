import { useState } from "react";

export const saveTask = (updatedTask) => {
  // const [task, setTask] = useState([]);
  localStorage.setItem("task", JSON.stringify(updatedTask));
  // setTask(updatedTask);
};

