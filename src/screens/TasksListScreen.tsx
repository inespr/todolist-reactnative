import React from "react";
import { RiSettings3Fill } from "react-icons/ri";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { TaskList } from "../components/TaskList";
import TaskListProps from "../interfaces/TaskListProps";
import { AscDesc } from "../components/AscDesc";

export const TasksListScreen: React.FC<TaskListProps> = () => {
  return (
    <View style={style.taskList}>
      <View style={style.tasks}>
        <View style={style.titleWrapper}>
          <Text style={style.textTitle}>To Do</Text>
          <RiSettings3Fill style={{ color: "white", fontSize: 34 }} />
        </View>
        <TaskList tasks={[]} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  tasks: {
    gap: 12,
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
    paddingHorizontal: 20,
    overflow: "hidden",
  },
});
