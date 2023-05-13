import Task from "./Task";
import {ReactNode} from 'react';
interface TaskFormProps {
  addTask: (newTask: Task) => void;
  children?: ReactNode;
  onAddTask: (newTask: Task) => void;
  selectedTask?: Task;
  
}
export default TaskFormProps;