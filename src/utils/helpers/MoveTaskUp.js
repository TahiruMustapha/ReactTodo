import React, { useState } from "react";
import { saveTask } from "./SaveTask";

export const moveTaskUp = (index, setTask) => {
  // const [task, setTask] = useState([]);
  let storedTask = JSON.parse(localStorage.getItem("task"));

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
