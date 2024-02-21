import { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { MoreHorizontal } from "react-feather";
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getDoneTask } from "../../../Service/KanBanBoardService";

export function DoneBoard(props) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [webSocketConnected, setWebSocketConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now()); // Added for triggering a re-fetch

  useEffect(() => {
    fetchTasks();
    setupWebSocket();

    return () => {
      // Cleanup WebSocket connection on component unmount
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [webSocketConnected, lastUpdate]);

  const fetchTasks = async () => {
    try {
      const employeeId = localStorage.getItem("id");

    
      const response = await getDoneTask(employeeId);

      if (response) {
        setTasks(response);
      } else {
        setError("No Tasks In Done Board Yet!!");
      }
    } catch (error) {
      console.log(error);
      setError("Error while fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  const setupWebSocket = () => {
    const socket = new SockJS("http://localhost:8090/ws");
    const stomp = Stomp.over(socket);

    stomp.reconnect_delay = 5000; // Reconnect after 5 seconds

    stomp.connect({}, (frame) => {
      console.log("Connected to WebSocket");
      setWebSocketConnected(true);
      setStompClient(stomp);

      const subscription = stomp.subscribe(
        "/topic/taskStatusUpdates",
        (message) => {
          try {
            const receivedTask = JSON.parse(message.body);
            console.log("Received task update:", receivedTask);

            // Update state
            setTasks((prevTasks) => {
              const index = prevTasks.findIndex(
                (task) => task.taskId === receivedTask.taskId
              );
              if (index !== -1) {
                const newTasks = [...prevTasks];
                newTasks[index] = receivedTask;
                return newTasks;
              }
              return [...prevTasks, receivedTask];
            });

            // Trigger re-fetch when tasks are updated
            setLastUpdate(Date.now());
          } catch (parseError) {
            console.error("Error parsing message body:", parseError);
          }
        }
      );
    });

    stomp.ws.onclose = () => {
      console.log("WebSocket connection closed. Reconnecting...");
      // Optionally handle additional reconnection logic here
      setupWebSocket();
    };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Message: {error}</div>;
  }

  return (
    <div className="board">
      <div className="board_top">
        <p className="board_top_title">
          {" "}
          <span>{props.bid}</span>
          Done<span> {tasks.length}</span>
        </p>
        {/* three dots ...  for more info */}
        <MoreHorizontal />
      </div>
      <div className="board_cards custom-scroll">
        {tasks.map((task) => (
          <div key={task.taskId}>
            <Card
              bid={props.bid}
              id={task.taskId}
              title={task.title}
              card={task}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
