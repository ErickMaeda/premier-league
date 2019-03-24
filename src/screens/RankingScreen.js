import React, {
    Component
} from 'react';
import {
    Table,
    Card
} from 'react-bootstrap';
import {
    connect
} from 'react-redux';
import {
    fetch as fetchMatches
} from '../actions/matchesAction';
import {
    fetch as fetchTeams
} from '../actions/teamsAction';
import {
    data as matchesByTeam
} from '../selectors/matchesByTeamSelector';

class Ranking extends Component {
    
    componentDidMount() {
        this.props.fetchTeams().then(this.props.fetchMatches);
    }

    renderRankingTable = () => {        
        return (
            <Card>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Club</th>
                            <th>Played</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                            <th>Pts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.ranking.map((team, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td><img style={styles.logo} src={team.logo}/> {team.name}</td>
                                        <td>{team.matches.length}</td>
                                        <td>{team.wins}</td>
                                        <td>{team.drawns}</td>
                                        <td>{team.losses}</td>
                                        <td>{team.goalsFor}</td>
                                        <td>{team.goalsAgainst}</td>
                                        <td>{team.goalsDifference}</td>
                                        <td>{team.points}</td>
                                    </tr>
                                );
                            })
                        }                        
                    </tbody>
                </Table>
            </Card>
        );
    }

    renderWeekGames = () => {
        return (
            <Card>
                <Card.Header>
                    Week #1
                </Card.Header>
                <Card.Body>

                </Card.Body>
            </Card>
        );
    }

    render() {
        return (
            <div style={styles.container}>
                <div className="row">
                    <div className="col-md-9">
                        {this.renderRankingTable()}
                    </div>
                    <div className="col-md-3">
                        {this.renderWeekGames()}
                    </div>
                </div>
            </div>
        );
    }
};

const styles = {
    container: {
        backgroundColor: '#fff',
        marginTop: 20,
        marginLeft: 40,
        marginRight: 40
    },
    logo: {
        height: 22,
        width: 22
    }
};

const mapStateToProps = (state) => {
    return {
        ranking: matchesByTeam(state)
    };
}

export default connect(mapStateToProps, { fetchMatches, fetchTeams })(Ranking);