import { Editable } from "../../Editabled/Editable";
import { Card } from "../Card/Card";
import "./Brd.css";
import { MoreHorizontal } from "react-feather";
export function Board(props) {
  return (
    <div className="board">
      <div className="board_top">
        <p className="board_top_title">
          <span>{props.bid}</span>
          To Do<span>2</span>
        </p>
        {/* three dots ...  for more info */}
        <MoreHorizontal />
      </div>
      <div className="board_cards custom-scroll">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Editable
          text="Add Card"
          displayClass="board_crads_add"
          placeholder="Enter Card Title"
          // editClass=""
          // onSubmit={(value)=>}
        ></Editable>
      </div>
    </div>
  );
}
