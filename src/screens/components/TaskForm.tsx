import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AiFillCloseCircle } from "react-icons/ai";

export const TaskForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    selectedDate: new Date(),
  });
  const STORAGE_KEY = "@myApp:formData";

  const handleSubmit = () => {
    const { title } = formData;
    if (title.trim()) {
      onSubmit(formData);
      saveFormData(formData);
      setFormData({
        title: "",
        description: "",
        selectedDate: new Date(),
      });
    }
  };

  const saveFormData = async (formData) => {
    try {
      const jsonFormData = JSON.stringify(formData);
      await AsyncStorage.setItem(STORAGE_KEY, jsonFormData);
      console.log("Form data saved successfully");
    } catch (error) {
      console.error("Error while saving form data:", error);
    }
  };

  return (
    <View style={styles.formWrapper}>
      <View style={styles.form}>
        <View style={{ alignItems: "flex-end", width: "100%" }}>
          <TouchableHighlight>
            <AiFillCloseCircle
              style={{
                width: "30px",
                height: "30px",
                color: "grey",
                alignSelf: "flex-end",
              }}
            />
          </TouchableHighlight>
        </View>
        <TextInput
          style={styles.input}
          value={formData.title}
          onChangeText={(title) =>
            setFormData({ ...formData, title: title })
          }
          placeholder="Add a task"
        />
        <TextInput
          style={styles.input}
          value={formData.description}
          onChangeText={(description) =>
            setFormData({ ...formData, description: description })
          }
          placeholder="Add a description"
        />
        <CalendarPicker
          onDateChange={(date) =>
            setFormData({ ...formData, selectedDate: date })
          }
          textStyle={{
            color: "white",
          }}
        />
        <Button title="Add" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formWrapper: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
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
});

