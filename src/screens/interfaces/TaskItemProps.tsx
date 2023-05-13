import Task from "./Task";

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onCheck: (id: string, isChecked: boolean) => void;
}

export default TaskItemProps;

