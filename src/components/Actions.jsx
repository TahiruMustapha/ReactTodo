import React from "react";
import { handleDeleteTask, moveTaskDown, moveTaskUp } from "../utils/helper";
export const Actions = ({ setTask, taskId, index }) => {
  
  return (
    <p className="taskActions">
      <button onClick={() => moveTaskUp(taskId, setTask)} className="removeBtn">
        Up
      </button>
      <button
        onClick={() => moveTaskDown(taskId, setTask)}
        className="removeBtn"
      >
        Down
      </button>
      <button
        onClick={() => handleDeleteTask(index, setTask)}
        className="removeBtn"
      >
        Remove
      </button>
    </p>
  );
};
