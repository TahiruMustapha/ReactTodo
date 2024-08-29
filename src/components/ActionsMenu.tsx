import { useState } from "react";
import { moveTaskDown, moveTaskUp } from "../utils/helper";
import { FaCaretDown, FaCaretUp, FaTrashAlt } from "react-icons/fa";
import Actions from "./Actions";
import ConfirmDelete from "./ConfirmDelete";
import Task from "./Task";
interface ActionsMenuProps {
  setOpenActionId: React.Dispatch<React.SetStateAction<string | null>>;
  setTask: React.Dispatch<React.SetStateAction<Task[]>>;
  taskId: string;
  index: number;
  actionRef: (ref: HTMLDivElement | null) => void;
}
const ActionsMenu:React.FC<ActionsMenuProps>= ({
  actionRef,
  setTask,
  taskId,
  index,
  setOpenActionId,
}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  return (
    <div ref={actionRef} className="actionMenuBox">
      <Actions
        onClick={() => {
          moveTaskUp(taskId, setTask, setOpenActionId);
        }}
        className="actionBtn"
      >
        Up
        <FaCaretUp className=" up" />
      </Actions>
      <Actions
        onClick={() => {
          moveTaskDown(taskId, setTask, setOpenActionId);
        }}
        className="actionBtn"
      >
        Down
        <FaCaretDown className=" up" />
      </Actions>
      {openDeleteDialog && (
        <ConfirmDelete
          setTask={setTask}
          taskId={index}
          setOpenDeleteDialog={setOpenDeleteDialog}
          setOpenActionId={setOpenActionId}
        />
      )}
      <p onClick={() => setOpenDeleteDialog(true)} className="actionBtn">
        Remove
        <span>
          <FaTrashAlt className=" del" />
        </span>
      </p>
    </div>
  );
};
export default ActionsMenu;
