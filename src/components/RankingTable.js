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
    getRanking,
    getRankingError,
    getRankingProgress
} from '../selectors/rankingSelector';
import {
    getColorByPosition
} from '../helpers/RankingHelper';
import {
    truncate
} from '../helpers/Utils';
import { Link } from 'react-router-dom';

class RankingTable extends React.PureComponent {

    renderProgress = () => {
        return (
            <Spinner animation="grow" />
        );
    };

    renderError = () => {
        return (
            <span>{this.props.error}</span>
        );
    };

    renderPlaceholder = () => {
        let component;
        if (this.props.error) {
            component = this.renderError();
        } else {
            component = this.renderProgress();
        }
        return (
            <tr>
                <td colSpan="10" className="text-center">
                    {component}
                </td>
            </tr>
        );
    };

    renderRows = () => {
        return this.props.ranking.map((team, index) => {
            const club = (
                <Link to={`/teams/${team.id}`}>
                    <img 
                        style={styles.logo} 
                        src={team.logo} 
                        alt={`${team.name} Logo`}
                    /> 
                    {truncate(team.name, 15)}
                </Link>
            );
            return (
                <tr key={index} style={{ backgroundColor: getColorByPosition(index + 1) }}>
                    <td><span>{index + 1}</span></td>
                    <td>{club}</td>
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
        });
    };

    render() {
        return (
            <Card>
                <Table hover responsive>
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
                        {this.props.ranking.length > 0 ? this.renderRows() : this.renderPlaceholder()}
                    </tbody>
                </Table>
            </Card>
        );
    };
};

const styles = {
    logo: {
        height: 22,
        width: 22
    }
};

const mapStateToProps = (state) => {
    return {
        ranking: getRanking(),
        error: getRankingError(),
        progress: getRankingProgress()
    };
}

export default connect(mapStateToProps)(RankingTable);