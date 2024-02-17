import { useEffect, useState } from "react";
import { Editable } from "../../Editabled/Editable";
import { Card } from "../Card/Card";
import "./Brd.css";
import { MoreHorizontal } from "react-feather";
import axios from "axios";
export function BB(props) {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [selectedTasks]);
  const fetchTasks = async () => {
    try {
      const status = "BACKLOG";
      const employeeId = localStorage.getItem("id");
      //"https://6593f4061493b01160698e98.mockapi.io/api/tasks/tasks"
      const URI = `http://localhost:8090/api/tasks/status/${status}/${employeeId}`;
      const response = await axios.get(URI);
      setTasks(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("from catch block", error);
      // setError("Error fetching data.");
    } finally {
      //setLoading(false);
    }
  };
  const clearSelectedTasks = () => {
    setSelectedTasks([]);
  };
  const moveSelectedTasksToActiveBoard = () => {
    const updateTaskStatus = async (taskId, newStatus) => {
      try {
        const empId = localStorage.getItem("id");
        console.log("task id : ", taskId);
        await axios.patch(
          `http://localhost:8090/api/tasks/${taskId}/ACTIVE/${empId}`
        );
        // Handle success, update state, etc.
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    };

    console.log(selectedTasks);

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

      console.log(taskId);
    }
  };
  return (
    <div className="board">
      <div className="board_top">
        <p className="board_top_title">
          {" "}
          <span>{props.bid}</span>
          Backlog<span> {tasks.length}</span>
        </p>
        {/* three dots ...  for more info */}
        <MoreHorizontal />
      </div>
      <div className="board_cards custom-scroll">
        {tasks.map((task) => (
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
        <button
          className="move_button"
          onClick={moveSelectedTasksToActiveBoard}
        >
          Move Selected to Active
        </button>
      </div>
    </div>
  );
}
