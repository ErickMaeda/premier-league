import React from 'react';
import {
    Table,
    Card,
    Spinner,
    Row,
    Alert
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
    getBackgroundColorByPosition
} from '../helpers/RankingHelper';
import {
    truncate
} from '../helpers/Utils';
import { Link } from 'react-router-dom';

class RankingTable extends React.PureComponent {

    renderProgress = () => {
        return (
            <Row className="justify-content-center" style={styles.container}>
                <Spinner animation="grow" />
            </Row>
        );
    };

    renderError = () => {
        const {
            error,
            refreshData
        } = this.props;

        return (
            <Row className="justify-content-center"  style={styles.container}>
                <Alert variant='warning'>
                    <span className="text-center">Something went wrong: <strong>{error}</strong>. Do you want to <Alert.Link onClick={refreshData}>try again?</Alert.Link></span>
                </Alert>
            </Row>
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
                <tr key={index} style={{ backgroundColor: getBackgroundColorByPosition(index + 1) }}>
                    <td>{team.ranking}</td>
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

        const {
            error,
            progress,
            ranking
        } = this.props;
        
        if (ranking.length === 0) {
            if (error) return this.renderError();
            if (progress) return this.renderProgress();
        }

        return (
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
                    {this.renderRows()}
                </tbody>
            </Table>
        );
    };
};

const styles = {
    logo: {
        height: 22,
        width: 22,
        marginRight: 4
    },
    container: {
        marginTop: 10,
        marginBottom: 10
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