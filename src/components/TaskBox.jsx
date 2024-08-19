import React from "react";
import { Actions } from "./Actions";
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
          <Actions setTask={setTask} taskId = {task.id} index = {index} />
        </div>
      ))}
    </div>
  );
};
