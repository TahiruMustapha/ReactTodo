import { editTaskDetails, saveTask } from "../utils/helper";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
const FormInput = ({ taskId, inputRef, setTask, task }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const edittedText = inputRef.current.value.trim();
    if (edittedText.length > 25) {
      return toast.error("Task should be brief & specific!");
    }
    if (taskId.current) {
      if (edittedText !== "" && taskId.current) {
        editTaskDetails(taskId.current, edittedText, setTask);
        toast.success("Task updated succefully!");
        inputRef.current.value = "";
        taskId.current = "";
      } else {
        toast.error("Nothing to update!");
      }
    } else {
      if (inputRef.current.value) {
        const taskData = {
          id: uuidv4(),
          name: inputRef.current.value,
        };
        setTask((previousTask) => [...previousTask, taskData]);
        saveTask([...task, taskData]);
        inputRef.current.value = "";
        toast.success("Task added succefully!");
      } else {
        toast.error("Input a task!");
      }
    }
  };
  return (
      <form onSubmit={handleFormSubmit} className=" todo-changeList">
        <input
          type="text"
          name="task"
          ref={inputRef}
          placeholder={taskId.current ? "" : "Add task here"}
        />
        <button type="submit">
          {taskId.current ? "Update task" : "Add task"}
        </button>
      </form>
  );
};
export default FormInput;
