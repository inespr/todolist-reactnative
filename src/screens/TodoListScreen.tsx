import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import moment from "moment";
import { BsFillCheckSquareFill, BsPlusCircleFill } from "react-icons/bs";
import { TaskList } from "./components/TaskList";
import { TaskForm } from "./components/TaskForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RiSettings3Fill } from 'react-icons/ri';

interface TaskData {
  id: string;
  title: string;
  description: string;
  selectedDate: string;
}

interface FormData {
  title: string;
  description: string;
  selectedDate: string;
}

export const TodoListScreen = () => {
  const [showForm, setShowForm] = useState(false);
  const [tasksByDay, setTasksByDay] = useState<{[key: string]: TaskData[]}>({});
  const [formData, setFormData] = useState<FormData | null>(null);

  const loadFormData = async () => {
    try {
      const jsonFormData = await AsyncStorage.getItem("@myApp:formData");
      console.log(jsonFormData);
      if (jsonFormData != null) {
        const formData = JSON.parse(jsonFormData);
        setFormData(formData);
        console.log(formData);
      }
    } catch (error) {
      console.error("Error while loading form data:", error);
    }
  };
  
  useEffect(() => {
    loadFormData();
  }, []);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const addTask = (title: string, description: string, selectedDate: string) => {
    const dateKey = moment(selectedDate).format("DD/MM");
    const currentDate = moment().format("DD/MM");
    const tomorrowDate = moment().add(1, "day").format("DD/MM");

    const newTask: TaskData = {
      id: Math.random().toString(),
      title,
      description,
      selectedDate,
    };

    setTasksByDay((prevTasksByDay) => ({
      ...prevTasksByDay,
      [dateKey]: [...(prevTasksByDay[dateKey] || []), newTask],
    }));

    setShowForm(false);
  };

  return (
    <View style={style.page}>
      <View style={style.container}>
        <View style={style.titleWrapper}>
          <Text style={style.textTitle}>To Do</Text>
          <RiSettings3Fill style={{ color: "white", fontSize: 34 }} />
        </View>
        {formData && (
          <View style={style.taskContainer}>
            <View style={style.secondtitleWrapper}>
              <BsFillCheckSquareFill style={{ color: "white" }} />
              <Text style={style.text}>
                {moment(formData.selectedDate).format("DD/MM")}
                Tasks:
              </Text>
            </View>
            <TaskList
              title={formData.title}
              description={formData.description}
            />
          </View>
        )}

        {Object.keys(tasksByDay).map(([dateKey, tasks]) => (
          <View key={dateKey} style={style.taskContainer}>
            <View style={style.secondtitleWrapper}>
              <BsFillCheckSquareFill style={{ color: "white" }} />
              <Text style={style.text}>
                {dateKey}
                Tasks:
              </Text>
            </View>
            {tasks.map((task: TaskData) => (
              <TaskList
                key={task.id}
                title={task.title}
                description={task.description}
              />
            ))}
          </View>
        ))}
      </View>
      <View>
        <TouchableOpacity onPress={handleShowForm}>
          <BsPlusCircleFill
            style={{
              width: "40px",
              height: "40px",
              color: "white",
              alignSelf: "flex-end",
              marginRight: "10%",
            }}
          />
        </TouchableOpacity>
        <Modal visible={showForm} animationType="slide">
          <TaskForm onSubmit={addTask} />
        </Modal>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  page: {
    backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
  },
  taskContainer: {},
  container: {
    backgroundColor: "#222222",
    margin: "10%",
    padding: "5%",
    borderRadius: 30,
  },
  titleWrapper: {
    flexDirection: "row",
    textAlign: "center",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  secondtitleWrapper: {
    flexDirection: "row",
  },

  text: {
    color: "white",
    textAlign: "center",
  },
  taskList: { gap: 10 },

  openSvg: {
    width: "30px",
    height: "30px",
  },
  closeSvg: { width: "30px", height: "30px" },
  buttonText: { color: "white" },
  textTitle: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
  },
  decorationLineDrop: {
    backgroundColor: "grey",
    width: "6px",
    height: "100%",
    borderRadius: 10,
  },
});
