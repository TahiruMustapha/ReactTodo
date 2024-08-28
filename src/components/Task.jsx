import { useEffect, useRef, useState } from "react";
import ActionsMenu from "./ActionsMenu";
import { HiDotsVertical } from "react-icons/hi";
const Task = ({ task, setTask, showEditTaskInfo, index }) => {
  const [openActionId, setOpenActionId] = useState(null);
  const actionRefs = useRef({});
  const showActions = (id) => {
    setOpenActionId((prevId) => (prevId === id ? null : id));
  };
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
  return (
    <>
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
    </>
  );
};

export default Task;
