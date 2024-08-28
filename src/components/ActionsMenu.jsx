import { useState } from "react";
import { moveTaskDown, moveTaskUp } from "../utils/helper";
import { FaCaretDown, FaCaretUp, FaTrashAlt } from "react-icons/fa";
import ConfirmDelete from "./ConfirmDelete";
const ActionsMenu = ({
  actionRef,
  setTask,
  taskId,
  index,
  setOpenActionId,
}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  return (
    <div ref={actionRef} className="actionMenuBox">
      <p
        onClick={() => {
          moveTaskUp(taskId, setTask, setOpenActionId);
        }}
        className="actionBtn"
      >
        Up
        <span>
          <FaCaretUp className=" up" />
        </span>
      </p>
      <p
        onClick={() => {
          moveTaskDown(taskId, setTask, setOpenActionId);
        }}
        className="actionBtn"
      >
        Down
        <span>
          <FaCaretDown className=" down" />
        </span>
      </p>
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
