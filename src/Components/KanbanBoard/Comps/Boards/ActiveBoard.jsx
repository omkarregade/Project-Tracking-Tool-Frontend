import { useEffect, useState } from "react";
import { Editable } from "../../Editabled/Editable";
import { Card } from "../Card/Card";
import "./Brd.css";
import { MoreHorizontal } from "react-feather";
import axios from "axios";
export function ActiveBoard(props) {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTasks, setSelectedTasks] = useState([]);
    

    const clearSelectedTasks = () => {
      setSelectedTasks([]);
    };

    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const response = await axios.get("http://localhost:8090/api/tasks/status/ACTIVE");
          setTasks(response.data);
        } catch (error) {
          setError("Error fetching data.");
        } finally {
          setLoading(false);
        }
      };
      fetchTasks();
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    


  const moveSelectedTasksToReviewBoard = () => {


    const updateTaskStatus = async (taskId, newStatus) => {
      try {
        const status = "REVIEWING";
        await axios.put(`http://localhost:8090/api/tasks/${taskId}/${status}`);
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
          Active<span> </span>
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
          onClick={moveSelectedTasksToReviewBoard}
        >
          Move Selected to Review
        </button>
      </div>
    </div>
  );
}
