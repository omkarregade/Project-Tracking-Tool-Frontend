import { useEffect, useState } from "react";
import { BacklogBoard } from "./Comps/Boards/BacklogBoard";
import { Board } from "./Comps/Boards/Board";
import "./kanban.css";
import axios from "axios";
import { DoneBoard } from "./Comps/Boards/DoneBoard";
import { ReviewBoard } from "./Comps/Boards/ReviewBoard";
import { ActiveBoard } from "./Comps/Boards/ActiveBoard";

export function Kanban() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
          <BacklogBoard bid="1" />
          <ActiveBoard bid="2" />
          <ReviewBoard bid="3" />
          <DoneBoard bid="4" />
        </div>
      </div>
    </div>
  );
}
