import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TaskItem } from "./TaskItem";
import Task from "../interfaces/TaskProps";
import { TaskForm } from "./TaskForm";
import TaskListProps from "../interfaces/TaskListProps";
import {
  AiFillCloseCircle,
  AiFillDelete,
  AiFillEdit,
  AiOutlineLine,
  AiOutlineClose,
} from "react-icons/ai";
import { BsFillCheckSquareFill } from "react-icons/bs";
import {
  TbSortAscendingLetters,
  TbSortDescendingLetters,
} from "react-icons/tb";
import { useTaskList } from "../hooks/useTaskList";
import { AscDesc } from "./AscDesc";

export const TaskList: React.FC<TaskListProps> = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectTask, setSelectTask] = useState<Task>();

  {
    /*Import useTaskList hook */
  }
  const {
    sections,
    updateTask,
    handleEditTask,
    deleteTask,
    addTask,
    handleAddTask,
    sortTasks,
    sortOrder,
    isFormVisible,
    setIsFormVisible,
  } = useTaskList();

  return (
    <View>

      <TouchableOpacity onPress={sortTasks}>
        {sortOrder == "asc" ? (
          <TbSortAscendingLetters
            style={{ color: "white", width: 25, height: 25 }}
          />
        ) : (
          <TbSortDescendingLetters
            style={{ color: "white", width: 25, height: 25 }}
          />
        )}
      </TouchableOpacity>

      <ScrollView
        style={style.scrollSection}
        scrollIndicatorInsets={{ right: -10 }}
      >
        {sections.map((section) => (
          <View key={section.title}>
            <Text style={style.taskTitle}>
              <BsFillCheckSquareFill /> {section.title}
            </Text>
            {section.data.length > 0 ? (
              <View style={style.taskSection}>
                {section.data.map((task) => (
                  <>
                    <TouchableOpacity
                      style={style.rowFront}
                      onPress={() => setSelectTask(task)}
                    >
                      <View style={style.menu}></View>
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
                    </TouchableOpacity>
                    {task === selectTask && (
                      <>
                        <View style={style.menuWrapper}>
                          <TouchableOpacity
                            onPress={() => setSelectTask(undefined)}
                          >
                            <AiOutlineClose style={style.iconMenuClose} />
                          </TouchableOpacity>
                          <View style={style.menu}>
                            <TouchableOpacity
                              onPress={() =>
                                handleEditTask(task.id, task.isEdit)
                              }
                            >
                              <AiFillEdit style={style.iconMenu} />
                            </TouchableOpacity>
                            <AiOutlineLine style={style.iconLineMenu} />
                            <TouchableOpacity
                              onPress={() => deleteTask(task.id)}
                            >
                              <AiFillDelete style={style.iconMenu} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </>
                    )}
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
            <TaskForm
              addTask={addTask}
              onAddTask={handleAddTask}
              selectedTask={selectTask}
            >
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
              onPress={() => {
                setIsFormVisible(true), setSelectTask(undefined);
              }}
            >
              <Text style={style.addButtonText}>Add Task</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  rowFront: {
    justifyContent: "space-between",
    width: "100%",
  },
  taskTitle: {
    color: "white",
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    display: "flex",
    gap: 5,
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
  menuWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    width: "100%",
  },
  menu: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  iconMenu: { color: "white", width: 25, height: 25 },
  iconMenuClose: { color: "white", width: 20, height: 20 },
  iconLineMenu: {
    color: "gray",
    width: 25,
    height: 25,
    rotate: "90deg",
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
    marginHorizontal: 0,
    marginTop: 10,
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
    minHeight: 470,
    overflowY: "scroll",
    scrollColor: " rgba(0, 0, 0, .5) rgba(0, 0, 0, 0)",
    scrollbarWidth: "thin",
  },
});
