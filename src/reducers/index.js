import { combineReducers } from "redux";

import ranking from "./rankingReducer";
import weeks from "./weeksReducer";
import teams from "./teamsReducer";
import weekSelected from "./weekSelectedReducer";

export default combineReducers({
  ranking,
  weeks,
  teams,
  weekSelected
});