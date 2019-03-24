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
} from '../selectors/rankingSelector';
import RankingTable from '../components/RankingTable';
import WeekGames from '../components/WeekGames';

class Ranking extends Component {
    
    componentDidMount() {
        this.props.fetchTeams().then(this.props.fetchMatches);
    }

    render() {
        return (
            <div style={styles.container}>
                <div className="row">
                    <div className="col-md-8">
                        <RankingTable />
                    </div>
                    <div className="col-md-4">
                        <WeekGames />
                    </div>
                </div>
            </div>
        );
    }
};

const styles = {
    container: {
        backgroundColor: '#fff',
        marginTop: 30,
        marginBottom: 30,
        marginLeft: 60,
        marginRight: 60
    }
};

const mapStateToProps = (state) => {
    return {
        ranking: matchesByTeam(state)
    };
}

export default connect(mapStateToProps, { fetchMatches, fetchTeams })(Ranking);