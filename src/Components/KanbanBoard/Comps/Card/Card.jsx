import { CheckCircle, CheckSquare, Clock, MoreHorizontal, User } from "react-feather";
import "./CardCss.css";
import { Chip } from "../../Chip/Chip";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
export function Card(props) {
const isDoneBoard = props.bid === 4 ;
  
  return (
    <div className="card">
      <div className="card_top">
        <div className="card_top_labels">
          <Chip text={props.card?.domain} color="green"></Chip>
          <Chip
            text={`Project Id ${props.card?.projectId}`}
            color="blue"
          ></Chip>
        </div>
        <MoreHorizontal />
      </div>

      <div className="card_title">
        {" "}
        {props.id} {props.title || "default"}{" "}
      </div>
      <div>{props.card?.description}</div>
      <div className="card_footer">
        <span>
          <Clock />
          {props.card?.deadlineTaskDate}
        </span>
        {isDoneBoard ? (
          <p>""</p>
        ) : (
          <p>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="radio-buttons-group"
              onChange={() => props.handleTaskSelect(props.id)}
              value={props.isSelected ? "select" : ""}
            >
              <FormControlLabel
                value="select"
                control={<Radio />}
                label="Select"
              />
            </RadioGroup>
          </p>
        )}
      </div>
    </div>
  );


}
