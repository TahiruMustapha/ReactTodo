import { editTaskDetails, saveTask } from "../utils/helper";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import React, { RefObject } from "react";

interface Task {
  id: string;
  name: string;
}

interface FormInputProps {
  setTask: React.Dispatch<React.SetStateAction<Task[]>>;
  task: Task[];
  taskId: string;
  inputRef: RefObject<HTMLInputElement>;
  setId: (id: string) => void;
}
const FormInput:React.FC<FormInputProps> = ({ taskId, inputRef, setTask, task, setId }) => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    const edittedText = inputRef.current? inputRef.current.value.trim() : "";
    if (edittedText.length > 25) {
      toast.error("Task should be brief & specific!");
      return;
    }
    if (taskId) {
      if (edittedText !== "" && taskId) {
        editTaskDetails(taskId, edittedText, setTask);
        toast.success("Task updated succefully!");
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        setId("");
      } else {
        toast.error("Nothing to update!");
      }
    } else {
      if (inputRef.current?.value) {
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
        placeholder={taskId ? "" : "Add task here"}
      />
      <button type="submit">{taskId ? "Update task" : "Add task"}</button>
    </form>
  );
};
export default FormInput;
