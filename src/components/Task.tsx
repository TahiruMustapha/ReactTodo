import React, { useEffect, useRef, useState } from "react";
import ActionsMenu from "./ActionsMenu";
import { HiDotsVertical } from "react-icons/hi";

interface Task {
  id: string;
  name: string;
}
interface FormInputProps {
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task[]>>;
  showEditTaskInfo: (id: string, task: string) => void;
  index: number;
}

const Task: React.FC<FormInputProps> = ({
  task,
  setTask,
  showEditTaskInfo,
  index,
}) => {
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const actionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const showActions = (id: string) => {
    setOpenActionId((prevId) => (prevId === id ? null : id));
  };
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      Object.values(actionRefs.current).forEach((ref) => {
        if (ref && !ref.contains(e.target as Node)) {
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
          actionRef={(ref) => (actionRefs.current[task.id] = ref)}
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
