import React from 'react';
import {
    Table,
    Card,
    Spinner
} from 'react-bootstrap';
import {
    connect
} from 'react-redux';
import {
    getRanking
} from '../selectors/rankingSelector';
import {
    getColorByPosition
} from '../helpers/RankingHelper';

class RankingTable extends React.PureComponent {

    renderLoading = () => {
        return (
            <Spinner animation="grow" />
        )
    }

    renderRows = () => {
        return this.props.ranking.map((team, index) => {
            return (
                <tr key={index} style={{backgroundColor: getColorByPosition(index + 1)}}>
                    <td><span>{index + 1}</span></td>
                    <td><img style={styles.logo} src={team.logo}/> {team.name}</td>
                    <td>{(team.wins + team.drawns + team.losses)}</td>
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
                        {this.props.ranking.length > 0 ? this.renderRows() : this.renderLoading()}                       
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

const mapStateToProps = (state) => {
    return {
        ranking: getRanking()
    };
}

export default connect(mapStateToProps)(RankingTable);