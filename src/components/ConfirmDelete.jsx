import { IoClose } from "react-icons/io5";
import { closeModals, handleDeleteTask } from "../utils/helper";
const ConfirmDelete = ({
  setTask,
  taskId,
  setOpenDeleteDialog,
  setOpenActionId,
}) => {
  return (
    <div
      onClick={() => closeModals(setOpenDeleteDialog, setOpenActionId)} className=" confirmDeleteBox "
    >
      <div className=" confirmDeleteContent ">
        <h2 className=" confirmDeleteHeader">Are you sure?</h2>
        <p className=" confirmDeleteText">This action cannot be undone.</p>
        <div className="confirmDeleteActions">
          <button
            onClick={() => closeModals(setOpenDeleteDialog, setOpenActionId)} className=" cancel"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDeleteTask(taskId, setTask)} className=" confirm "
          >
            Comfirm
          </button>
        </div>
        <IoClose
          onClick={() => closeModals(setOpenDeleteDialog, setOpenActionId)} className=" closeDialog "
        />
      </div>
    </div>
  );
}
export default ConfirmDelete;
