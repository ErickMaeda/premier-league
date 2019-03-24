import { combineReducers } from "redux";

import ranking from "./rankingReducer";
import matches from "./matchesReducer";
import teams from "./teamsReducer";
import weekSelected from "./weekSelectedReducer";

export default combineReducers({
  ranking,
  matches,
  teams,
  weekSelected
});