import { combineReducers } from "redux";

import matchesByTeam from "./matchesByTeamReducer";
import matches from "./matchesReducer";
import teams from "./teamsReducer";

export default combineReducers({
  matchesByTeam,
  matches,
  teams
});