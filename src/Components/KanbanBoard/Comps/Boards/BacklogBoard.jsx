import { useEffect, useState } from "react";
import { Editable } from "../../Editabled/Editable";
import { Card } from "../Card/Card";
import "./Brd.css";
import { MoreHorizontal } from "react-feather";
import axios from "axios";
export function BacklogBoard(props) {
  const [selectedTasks, setSelectedTasks] = useState([]);


   const clearSelectedTasks = () => {
    setSelectedTasks([]);
  };
      const moveSelectedTasksToActiveBoard = () => {

        // Logic to move selected tasks to Active board
        // Update the state, API calls, or any other necessary operations
        const updateTaskStatus = async (taskId, newStatus) => {
          try {
            await axios.put(`http://localhost:8090/api/tasks/${taskId}`, {
              status: newStatus,
            });
            // Handle success, update state, etc.
          } catch (error) {
            console.error("Error updating task status:", error);
          }
        };

        // Loop through selected tasks and update their status to move to Active board
        selectedTasks.forEach((taskId) => {
          updateTaskStatus(taskId, "Active");
        });

        // Clear the selected tasks
        clearSelectedTasks();
      };


             const handleTaskSelect = (taskId) => {
               const isSelected = selectedTasks.includes(taskId);
               if (isSelected) {
                 setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
               } else {
                 setSelectedTasks([...selectedTasks, taskId]);
               }
             };
  return (
    <div className="board">
      <div className="board_top">
        <p className="board_top_title">
          {" "}
          <span>{props.bid}</span>
          Backlog<span> {props.tasks.length}</span>
        </p>
        {/* three dots ...  for more info */}
        <MoreHorizontal />
      </div>
      <div className="board_cards custom-scroll">
        {props.tasks.map((task) => (
          <div>
            <Card
              bid={props.bid}
              id={task.taskId}
              title={task.title}
              card={task}
              handleTaskSelect={handleTaskSelect}
              isSelected={selectedTasks?.includes(task.taskId) ?? false}
            ></Card>
          </div>
        ))}
      </div>
      <div>
        <button className="move_button" onClick={moveSelectedTasksToActiveBoard}>
          Move Selected to Active
        </button>
      </div>
    </div>
  );
}
