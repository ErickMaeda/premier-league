import React from 'react';
import {
    Table,
    Card
} from 'react-bootstrap';
import {
    connect
} from 'react-redux';
import {
    data as matchesByTeam
} from '../selectors/matchesByTeamSelector';
import {
    getColorByPosition
} from '../helpers/RankingHelper';

class RankingTable extends React.PureComponent {

    render() {
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
                                    <tr style={{backgroundColor: getColorByPosition(index + 1)}}>
                                        <td><span>{index + 1}</span></td>
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
};

const styles = {
    logo: {
        height: 22,
        width: 22
    }
};

const mapStateToProps = (state: Array): Object => {
    return {
        ranking: matchesByTeam(state)
    };
}

export default connect(mapStateToProps)(RankingTable);