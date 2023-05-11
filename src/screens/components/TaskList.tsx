import React from "react";
import { StyleSheet, View } from "react-native";
import { Task } from "./Task";

export const TaskList = ({title, description}) => {
  return (
    <>
      <View style={style.taskSection}>
        <Task title={title} description={description} />
      </View>
    </>
  );
};

const style = StyleSheet.create({
  taskSection: {
    shadowColor: "black",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    backgroundColor: "#282828",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  task: {
    display: "flex",
  },
});
