import { useEffect, useState } from "react";
import { BacklogBoard } from "./Comps/Boards/BacklogBoard";
import { Board } from "./Comps/Boards/Board";
import "./kanban.css";
import axios from "axios";
import { DoneBoard } from "./Comps/Boards/DoneBoard";
import { ReviewBoard } from "./Comps/Boards/ReviewBoard";
import { ActiveBoard } from "./Comps/Boards/ActiveBoard";

export function Kanban() {


   const [tasks, setTasks] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
    
  const taskData = [
    {
      taskId: 1,
      title: "Sample Task",
      description: "This is a sample task",
      domain: "Frontend",
      status: "Backlog",
      startTaskDate: "2024-01-01",
      deadlineTaskDate: "2024-01-15",
    
        projectId: 1,
        employeeId: 1,
  
    },
    {
      taskId: 2,
      title: "Sample Task",
      description: "This is a sample task",
      domain: "Backend",
      status: "Backlog",
      startTaskDate: "2024-01-01",
      deadlineTaskDate: "2024-01-15",
     
        projectId: 1,
        employeeId: 3,
    
    }
  ];


    useEffect(() => {
      const fetchTasks = async () => {
        try {
          //"https://6593f4061493b01160698e98.mockapi.io/api/tasks/tasks"
          const URI = "http://localhost:8090/api/tasks";
          const response = await axios.get(URI);
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



  return (
    <div className="kanban">
      <div className="kanban_navbar">
        <h2>Kanban Board</h2>
      </div>
      <div className="kanban_outer">
        <div className="kanban_boards">
          <BacklogBoard
            bid="1"
            tasks={tasks}
            // tasks={taskData}
          />
          <ActiveBoard bid="2" />
          <ReviewBoard bid="3" />
          <DoneBoard bid="4" />
        </div>
      </div>
    </div>
  );
}
