import Task from "./TaskProps";

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onCheck: (id: string, isChecked: boolean) => void;
}

export default TaskItemProps;
