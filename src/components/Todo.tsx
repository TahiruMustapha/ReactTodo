import { useEffect, useRef, useState } from "react";
import { getTask } from "../utils/helper";
import { TaskBox } from "./TaskBox";
import FormInput from "./FormInput";

interface Task {
  id: string;
  name: string;
}
const Todo:React.FC = () => {
  const [task, setTask] = useState<Task[]>([]);
  const [taskId, setId] = useState("");
  const inputRef:any = useRef(null);
  useEffect(() => {
    const storedTask = getTask();
    setTask(storedTask);
  }, []);
  const showEditTaskInfo = (id:string, task:string) => {
    setId(id);
    inputRef.current.value = task;
  };
  return (
    <div className="todo">
      <div className="todoFormBox">
        <FormInput
          setTask={setTask}
          task={task}
          taskId={taskId}
          inputRef={inputRef}
          setId= {setId}
        />
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
