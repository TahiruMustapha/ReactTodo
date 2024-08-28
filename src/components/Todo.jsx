import { useEffect, useRef, useState } from "react";
import FormInput from "./FormInput";
import { getTask } from "../utils/helper";
import { TaskBox } from "./TaskBox";
const Todo = () => {
  const [task, setTask] = useState([]);
  const taskId = useRef("");
  const inputRef = useRef(null);
  useEffect(() => {
    const storedTask = getTask();
    setTask(storedTask);
  }, []);
  const showEditTaskInfo = (id, task) => {
    taskId.current = id;
    inputRef.current.value = task;
  };
  return (
    <div className="todo">
      <div className="todoFormBox">
        <FormInput setTask= {setTask} task={task} taskId= {taskId} inputRef={inputRef} />
      </div>
      {task.length >= 1 ? (
        <div className="todoContainer">
          <TaskBox
            taskes={task}
            setTask={setTask}
            showEditTaskInfo={showEditTaskInfo}
          />
        </div>
      ) : (
        <p className="noTask">Zero task today!</p>
      )}
    </div>
  );
};
export default Todo;
