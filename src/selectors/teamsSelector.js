export const data = (state) => state.teams || [];

export const team = (state, teamName) => {
    let teams = data(state);
    let team = {};
    teams = teams.filter((team) => team.name === teamName);
    if (teams.length > 0) {
        team = teams[0];
    }
    return team;
};

export const teamLogo = (state, teamName) => {
    return team(state, teamName).logo
};

export const teamShortName = (state, teamName) => {
    console.log(team(state, teamName));
    
    return team(state, teamName).shortName;
};