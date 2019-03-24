import React, {
    Component
} from 'react';
import {
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
import RankingTable from '../components/RankingTable';

class Ranking extends Component {
    
    componentDidMount() {
        this.props.fetchTeams().then(this.props.fetchMatches);
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
                        <RankingTable />
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
        marginRight: 40,
        marginBottom: 20
    }
};

const mapStateToProps = (state) => {
    return {
        ranking: matchesByTeam(state)
    };
}

export default connect(mapStateToProps, { fetchMatches, fetchTeams })(Ranking);