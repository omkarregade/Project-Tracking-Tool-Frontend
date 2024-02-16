import { useEffect, useState } from "react";
import { Editable } from "../../Editabled/Editable";
import { Card } from "../Card/Card";
import "./Brd.css";
import { MoreHorizontal } from "react-feather";
import axios from "axios";
export function DoneBoard(props) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    try {
      const status = "DONE";
      const employeeId = localStorage.getItem("id");

      const URI = `http://localhost:8090/api/tasks/status/${status}/${employeeId}`;
      const response = await axios.get(URI);

      if (response.data) {
        setTasks(response.data);
      } else {
        setError("No Tasks In Done Board Yet!!");
      }
    } catch (error) {
      console.log(error);
      setError("error while fetching tasks");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Message : {error}</div>;
  }

  return (
    <div className="board">
      <div className="board_top">
        <p className="board_top_title">
          {" "}
          <span>{props.bid}</span>
          Done<span> {}</span>
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
            ></Card>
          </div>
        ))}
      </div>
    </div>
  );
}
