import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { AiOutlineCheck } from "react-icons/ai";
import TaskFormProps from "../interfaces/TaskFormProps";
import Task from "../interfaces/TaskProps";
import moment from "moment";
import { v4 as Uuidv4 } from "uuid";

export const TaskForm: React.FC<TaskFormProps> = ({
  children,
  onAddTask,
  selectedTask,
}) => {
  const [newTask, setNewTask] = useState<Task>(() => {
    if (selectedTask) {
      console.log(selectedTask, "selected");
      return { ...selectedTask, selectedTask : undefined };
    } else {
      return {
        id: Uuidv4(),
        title: "",
        description: "",
        selectedDate: "",
        isChecked: true,
        isEdit: true,
      };
    }
  });
  

  const [error, setError] = useState("");

  const handleAddTask = () => {
    
    console.log(newTask);
    if (!newTask.title) {
      setError("Title is required");
      return;
    } else if (!newTask.selectedDate) {
      setError("Date is required");
      return;
    } else if (!newTask.title && !newTask.selectedDate) {
      setError("Date and Title are required");
    }

    onAddTask(newTask);
    setNewTask({
      id: Uuidv4(),
      title: "",
      description: "",
      selectedDate: "",
      isChecked: true,
      isEdit: true,
    });
  };

  const handleDateSelect = (date: moment.Moment) => {
    setNewTask({ ...newTask, selectedDate: date.toISOString() });
  };
  

  return (
    <View style={styles.formWrapper}>
      <View style={styles.form}>
        <View style={{ alignItems: "flex-end", width: "100%" }}>
          {children}
        </View>
        <TextInput
          style={styles.input}
          value={newTask.title}
          onChangeText={(text) => setNewTask({ ...newTask, title: text })}
          placeholder="Add a task"
        />
        {error == "Title is required" ? (
          <Text style={styles.error}>{error}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          value={newTask.description}
          onChangeText={(text) => setNewTask({ ...newTask, description: text })}
          placeholder="Add a description"
        />
        <CalendarPicker
          onDateChange={handleDateSelect}
          selectedStartDate={new Date(newTask.selectedDate)}
          textStyle={{
            color: "white",
          }}
        />
        {error == "Date is required" ? (
          <Text style={styles.error}>{error}</Text>
        ) : null}
        {error == "Date and Title are required" ? (
          <Text style={styles.error}>{error}</Text>
        ) : null}
        <TouchableHighlight onPress={handleAddTask}>
          <AiOutlineCheck />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formWrapper: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  form: {
    borderRadius: 20,
    margin: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#222222",
    gap: 20,
    color: "gray",
    justifyContent: "center",
    width: "95%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: "white",
    width: "100%",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
