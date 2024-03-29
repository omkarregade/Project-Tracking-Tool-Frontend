import { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { MoreHorizontal, Move } from "react-feather";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {
  getBacklogTask,
  moveBacklogToActive,
} from "../../../Service/KanBanBoardService";

const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`, // Include the token in the Authorization header
};

if (token) console.log("token present ");

export function BacklogBoard(props) {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [stompSubscriptions, setStompSubscriptions] = useState([]);
  const [webSocketConnected, setWebSocketConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now()); // Added for triggering a re-fetch
  const [lastCreated, setLastCreated] = useState(Date.now());

  useEffect(() => {
    fetchTasks();
    setupWebSocket();

    return () => {
      // Cleanup WebSocket connection and subscriptions on component unmount
      if (stompClient) {
        stompClient.disconnect();
      }
      stompSubscriptions.forEach((subscription) => subscription.unsubscribe());
    };
  }, [webSocketConnected, lastUpdate, lastCreated]);

  const fetchTasks = async () => {
    try {
      const status = "BACKLOG";
      const employeeId = localStorage.getItem("id");
      const response = await getBacklogTask(employeeId);
      console.log("backlog task: ", response);
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

      // Subscription for task status updates
      const taskStatusSubscription = stomp.subscribe(
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

      // Subscription for task creation updates
      const taskCreationSubscription = stomp.subscribe(
        "/topic/taskCreationUpdate",
        (message) => {
          try {
            const createdTask = JSON.parse(message.body);
            console.log("Received task creation update:", createdTask);

            // Trigger re-fetch when new tasks are created
            setLastCreated(Date.now());
          } catch (parseError) {
            console.error("Error parsing message body:", parseError);
          }
        }
      );

      // Save subscriptions for cleanup when the component is unmounted
      setStompSubscriptions([taskStatusSubscription, taskCreationSubscription]);
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

  const moveSelectedTasksToActiveBoard = () => {
    const updateTaskStatus = async (taskId) => {
      try {
        const empId = localStorage.getItem("id");
        await moveBacklogToActive(taskId, empId);
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    };

    // Loop through selected tasks and update their status to move to Active board
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
          <span>{props.bid}</span> Backlog <span>{tasks.length}</span>
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
          onClick={moveSelectedTasksToActiveBoard}
        >
          Move Selected to Active
        </button>
      </div>
    </div>
  );
}
