import React, { useEffect, useState } from "react";
import { Actions } from "./Actions";
import { handleDeleteTask, moveTaskDown, moveTaskUp } from "../utils/helper";

export const TaskBox = ({ taskes, setTask, showEditTaskInfo }) => {
  return (
    <div>
      {taskes.map((task, index) => (
        <div key={index} className="taskBox">
          <li
            key={task.id}
            onClick={() => showEditTaskInfo(task.id, task.name)}
            className="task"
          >
            {task.name}
          </li>
          <p className="taskActions">
            <span onClick={() => moveTaskUp(task.id, setTask)}>
              {" "}
              <Actions>Up</Actions>{" "}
            </span>

            <span onClick={() => moveTaskDown(task.id, setTask)}>
              <Actions>Down</Actions>{" "}
            </span>
            <span onClick={() => handleDeleteTask(index, setTask)}>
              {" "}
              <Actions>Remove</Actions>{" "}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};
