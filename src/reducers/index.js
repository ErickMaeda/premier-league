import { combineReducers } from "redux";

import matches from "./matchesReducer";
import teams from "./teamsReducer";

export default combineReducers({
  matches,
  teams
});