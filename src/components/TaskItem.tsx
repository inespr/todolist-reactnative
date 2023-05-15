import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { CheckButton } from "./CheckButton";
import TaskItemProps from "../interfaces/TaskItemProps";
import { AiFillDelete } from "react-icons/ai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Task from "../interfaces/Task";

export const TaskItem = ({ task, onCheck }: TaskItemProps) => {
  const [isChecked, setIsChecked] = useState(task.isChecked); // Estado local para guardar el estado de la tarea

  const [clicked, setClicked] = useState(true);

  const handleCheck = () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);
    onCheck(task.id, newIsChecked); // Actualiza el estado de la tarea en el estado "tasks"
  };

  return (
    <>
      <View style={style.taskWrapper}>
        <View style={style.decorationLine}></View>
        <View style={style.textAndButtonWrapper}>
          <View style={style.textsWrapper}>
            <Text
              style={[
                style.taskTitle,

                {
                  textDecorationLine: isChecked ? "none" : "line-through",
                  color: isChecked ? "white" : "#848484",
                },
              ]}
              numberOfLines={1}
            >
              {task.title}
            </Text>
            <Text
              style={[
                style.description,
                { color: isChecked ? "white" : "#848484" },
              ]}
              numberOfLines={1}
            >
              {task.description}
            </Text>
          </View>
          <CheckButton isChecked={isChecked} onCheck={handleCheck} />
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  taskWrapper: {
    flexDirection: "row",
    gap: 20,
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
  },
  textsWrapper: { flex: 1 },
  textAndButtonWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  decorationLine: {
    backgroundColor: "green",
    width: "6px",
    borderRadius: 10,
  },
  taskTitle: { color: "white", fontSize: 25 },
  description: {
    color: "white",
  },
});
