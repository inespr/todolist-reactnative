import React, { useState } from 'react'
import { TbSortAscendingLetters, TbSortDescendingLetters } from 'react-icons/tb';
import { TouchableOpacity } from 'react-native';
import Task from "../interfaces/TaskProps";


export const AscDesc = ({tasks, setTasks, sortTasks}:{
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  sortTasks:() => void;
}) => {

  const [sortOrder, setSortOrder] = useState("asc");
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  
  return (
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
  )
}
