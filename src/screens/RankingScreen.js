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
                        <tr>
                            <td>1</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>
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
        marginLeft: 20,
        marginRight: 20
    }
};

const mapStateToProps = (state) => {
    return {
        ranking: matchesByTeam(state)
    };
}

export default connect(mapStateToProps, { fetchMatches, fetchTeams })(Ranking);