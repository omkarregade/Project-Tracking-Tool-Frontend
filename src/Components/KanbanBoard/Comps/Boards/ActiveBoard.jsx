import { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { MoreHorizontal } from "react-feather";
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {
  getActiveTask,
  moveActiveToReview,
} from "../../../Service/KanBanBoardService";

export function ActiveBoard(props) {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
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
      // const status = "ACTIVE";
      const employeeId = localStorage.getItem("id");
      // const URI = `http://localhost:8090/api/tasks/status/${status}/${employeeId}`;
      // const response = await axios.get(URI);
      const response = await getActiveTask(employeeId);
      setTasks(response);
    } catch (error) {
      console.error("Error fetching tasks:", error);
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

  const clearSelectedTasks = () => {
    setSelectedTasks([]);
  };

  const moveSelectedTasksToReviewBoard = () => {
    const updateTaskStatus = async (taskId) => {
      try {
        const empId = localStorage.getItem("id");
        await moveActiveToReview(taskId, empId);
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    };

    // Loop through selected tasks and update their status to move to Review board
    selectedTasks.forEach((taskId) => {
      updateTaskStatus(taskId);
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
          Active<span> {tasks.length}</span>
        </p>
        <MoreHorizontal />
      </div>
      <div className="board_cards custom-scroll">
        {tasks.map((task) => (
          <Card
            key={task.taskId}
            bid={props.bid}
            id={task.taskId}
            title={task.title}
            card={task}
            handleTaskSelect={handleTaskSelect}
            isSelected={selectedTasks?.includes(task.taskId) ?? false}
          />
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
