import React, { useState, useEffect } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { TaskItem } from "./TaskItem";
import Task from "../interfaces/Task";
import { TaskForm } from "./TaskForm";
import TaskListProps from "../interfaces/TaskListProps";
import { AiFillCloseCircle, AiFillDelete } from "react-icons/ai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { SwipeListView } from "react-native-swipe-list-view";
import { RiSettings3Fill } from "react-icons/ri";
import { BsFillCheckSquareFill } from "react-icons/bs";

export const TaskList: React.FC<TaskListProps> = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [selectTask, setSelectTask] = useState<Task>();
  const [isEditing, setIsEditing] = useState(false);


  const addTask = async (newTask: Task) => {
    const taskDate = moment(newTask.selectedDate).format("dddd, MMMM Do, YYYY");

    {
      /*Check if task is for the selected date*/
    }
    if (moment(newTask.selectedDate).isSame(selectedDate, "day")) {
      const updatedTasks = [...tasks, newTask];
      const daySections = getDaySections(updatedTasks, selectedDate);
      console.log(updatedTasks)
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
        console.log('render')
        setTasks(tasks);
      } catch (error) {
        console.log(error);
      }
    };

    getTasks();
  }, []);

  const getDaySections = (tasks: Task[], selectedDate: string) => {
    // Create a map with a key for each date with tasks, and an array of tasks as value
    const taskMap: { [key: string]: Task[] } = {};
    tasks.forEach((task) => {
      const taskDate = moment(task.selectedDate).format("dddd, MMMM Do, YYYY");
      if (taskMap[taskDate]) {
        taskMap[taskDate].push(task);
      } else {
        taskMap[taskDate] = [task];
      }
    });

    // Create an array of section titles for each date with tasks
    const sectionTitles = Object.keys(taskMap);

    // Create a section for each date with tasks and add the corresponding tasks
    const daySections = sectionTitles.map((title) => ({
      title,
      data: taskMap[title],
    }));

    return daySections;
  };

  const sections = getDaySections(tasks, selectedDate);

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
    isEdit = true;
    const taskToEdit = tasks.find(task => task.id === taskId);
    setIsEditing(true);
    console.log('editing...', taskToEdit, isEditing)
    setSelectTask(taskToEdit);
    setIsFormVisible(true);
  };

 
  
  
  return (
    <View style={style.taskList}>
      <View style={style.tasks}>
        <View style={style.titleWrapper}>
          <Text style={style.textTitle}>To Do</Text>
          <RiSettings3Fill style={{ color: "white", fontSize: 34 }} />
        </View>
        <ScrollView style={style.scrollSection}>
          {sections.map((section) => (
            <View key={section.title}>
              <Text style={style.taskTitle}>
                <BsFillCheckSquareFill /> {section.title}
              </Text>
              {section.data.length > 0 ? (
                <View style={style.taskSection}>
                  {section.data.map((task) => (
                    <>
                      <TouchableHighlight onPress={() => deleteTask(task.id)}>
                        <Text style={{ color: "red" }}>DELETE</Text>
                      </TouchableHighlight>
                      <TouchableOpacity onPress={() => handleEditTask(task.id, task.isEdit)}>
                        <Text>Edit</Text>
                      </TouchableOpacity>
                      <TaskItem
                        key={task.id}
                        task={task}
                        onDelete={(id) =>
                          setTasks(tasks.filter((task) => task.id !== id))
                        }
                        onCheck={(id, isChecked) =>
                          updateTask({ ...task, isChecked })
                        }
                      />
                    </>
                  ))}
                </View>
              ) : (
                <View style={style.taskSection}>
                  <Text>No task to display</Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
        <View style={style.buttonFormContainer}>
          {isFormVisible ? (
            <Modal
              visible={isFormVisible}
              animationType="slide"
              style={style.form}
            >
              <TaskForm addTask={addTask} onAddTask={handleAddTask} selectedTask={selectTask} >
                <TouchableOpacity
                  style={style.closeButton}
                  onPress={() => setIsFormVisible(false)}
                >
                  <AiFillCloseCircle style={style.icon} />
                </TouchableOpacity>
              </TaskForm>
            </Modal>
          ) : (
            <View style={style.buttonWrapper}>
              <TouchableOpacity
                style={style.addButton}
                onPress={() => setIsFormVisible(true)}
              >
                <Text style={style.addButtonText}>Add Task</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  taskTitle: {
    color: "white",
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    display: "flex",
    gap: 5,
  },
  tasks: {
    gap: 20,
  },
  titleWrapper: {
    flexDirection: "row",
    textAlign: "center",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textTitle: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
  },
  taskList: {
    backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },
  taskSection: {
    marginTop: 20,
    marginBottom: 30,
    padding: "5%",
    borderRadius: 30,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    backgroundColor: "#222222",
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
  },
  form: {
    backgroundColor: "black",
  },
  task: {
    display: "flex",
  },
  addButtonText: {
    color: "white",
  },
  buttonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  addButton: {
    backgroundColor: "grey",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  icon: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButton: {
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 20,
    alignSelf: "flex-end",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonFormContainer: {},
  scrollSection: {
    flexGrow: 1,
    maxHeight: 470,
    overflowY: "scroll",
  },
});
