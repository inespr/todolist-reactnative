import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import {useState, useEffect} from 'react';
import Task from "../interfaces/TaskProps";
import { v4 as uuidv4 } from "uuid";


export const useTaskList = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [selectTask, setSelectTask] = useState<Task>();
  const [isFormEditDeleteVisible, setTsFormEditDeleteVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);



  const addTask = async (newTask: Task) => {
    const taskDate = moment(newTask.selectedDate).format("dddd, MMMM Do, YYYY");

    {
      /*Check if task is for the selected date*/
    }
    if (moment(newTask.selectedDate).isSame(selectedDate, "day")) {
      const updatedTasks = [...tasks, newTask];
      const daySections = getDaySections(updatedTasks, selectedDate);
      console.log(updatedTasks);
      setTasks(updatedTasks);
    } else {
      {
        /*If not for the selected date, group by date and add the task to the corresponding section*/
      }
      const updatedTasks = [...tasks, newTask];
      const daySections = getDaySections(updatedTasks, selectedDate);
      await saveTasks(updatedTasks);
      setTasks(updatedTasks);
    }
  };

  const handleAddTask = async (newTask: Task) => {
    setSelectTask({
      id: uuidv4(),
      title: "",
      description: "",
      selectedDate: "",
      isChecked: true,
      isEdit: true,
    });
    setTsFormEditDeleteVisible(false);
    if (isEditing) {
      await updateTask(newTask);
      setIsEditing(false);
    } else {
      await saveTasks([...tasks, newTask]);

      addTask(newTask);
    }
    setIsFormVisible(false);
  };

  const saveTasks = async (tasks: Task[]) => {
    try {
      const jsonTasks = JSON.stringify(tasks);
      console.log(jsonTasks);
      await AsyncStorage.setItem("tasks", jsonTasks);
    } catch (error) {
      console.log("Error saving tasks:", error);
    }
  };

  const updateTask = async (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );

    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error while updating task:", error);
    }

    setTasks(updatedTasks);
  };

  useEffect(() => {
    {
      /*Obtener las tareas almacenadas en AsyncStorage*/
    }
    const getTasks = async () => {
      try {
        const tasksJson = await AsyncStorage.getItem("tasks");
        const tasks = tasksJson != null ? JSON.parse(tasksJson) : {};
        console.log("render");
        setTasks(tasks);
      } catch (error) {
        console.log(error);
      }
    };

    getTasks();
  }, []);

  const getDaySections = (tasks: Task[], selectedDate: string) => {
    {
      /*Create a map with a key for each date with tasks, and an array of tasks as value*/
    }
    const taskMap: { [key: string]: Task[] } = {};
    tasks.forEach((task) => {
      const taskDate = moment(task.selectedDate).format("dddd, MMMM Do, YYYY");
      if (taskMap[taskDate]) {
        taskMap[taskDate].push(task);
      } else {
        taskMap[taskDate] = [task];
      }
    });

    {
      /*Create an array of section titles for each date with tasks*/
    }
    const sectionTitles = Object.keys(taskMap);

    {
      /*Create a section for each date with tasks and add the corresponding tasks*/
    }
    const daySections = sectionTitles.map((title) => ({
      title,
      data: taskMap[title],
    }));

    return daySections;
  };

  const sections = getDaySections(tasks, selectedDate);
  console.log(sections);

  const deleteTask = async (taskId: string) => {
    try {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      await saveTasks(updatedTasks);
      setTasks(updatedTasks);
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  const handleEditTask = (taskId: string, isEdit: boolean) => {
    isEdit == true;
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setIsEditing(true);
    console.log("editing...", taskToEdit, isEditing);
    setSelectTask(taskToEdit);
    setIsFormVisible(true);
  };
  const sortTasks = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setTasks(sortedTasks);
    toggleSortOrder();
  };
  return {sections, updateTask, handleEditTask, deleteTask, addTask, handleAddTask,sortTasks, sortOrder, isFormVisible, setIsFormVisible}
}
