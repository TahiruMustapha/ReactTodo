import Task from "./Task";
interface Tasks {
  id: string;
  name: string;
}
interface FormInputProps {
  taskes: Tasks[];
  setTask: React.Dispatch<React.SetStateAction<Tasks[]>>;
  showEditTaskInfo: (id: string, task: string) => void;
}
export const TaskBox:React.FC<FormInputProps> = ({ taskes, setTask, showEditTaskInfo }) => {
  return (
    <div>
      {taskes.map((task, index) => (
        <ul key={index} className="taskBox">
          <Task
            index={index}
            task={task}
            setTask={setTask}
            showEditTaskInfo={showEditTaskInfo}
          />
        </ul>
      ))}
    </div>
  );
};
