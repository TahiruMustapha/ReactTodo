import Task from "./Task";
export const TaskBox = ({ taskes, setTask, showEditTaskInfo }) => {
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
