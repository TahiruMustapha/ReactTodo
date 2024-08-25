import React, { useEffect, useRef, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import ActionsMenu from "./ActionsMenu";
export const TaskBox = ({ taskes, setTask, showEditTaskInfo }) => {
  const [openActionId, setOpenActionId] = useState(null);
  const actionRefs = useRef({});
  const taskId = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      Object.values(actionRefs.current).forEach((ref) => {
        if (ref && !ref.contains(e.target)) {
          setOpenActionId(null);
        }
      });
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  const showActions = (id) => {
    setOpenActionId((prevId) => (prevId === id ? null : id));
  };
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
          {openActionId === task.id && (
            <ActionsMenu
              setOpenActionId={setOpenActionId}
              setTask={setTask}
              taskId={task.id}
              index={index}
              actionRef={(ref) => (actionRefs.current[task._id] = ref)}
            />
          )}
          <HiDotsVertical
            className="actionsMenu"
            onClick={() => showActions(task.id)}
          />
        </div>
      ))}
    </div>
  );
};
