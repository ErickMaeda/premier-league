import React, {
    Component
} from 'react';
import {
    Container,
    Row,
    Col
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
            <Container>
                <Row style={styles.container}>
                    <Col md={12} lg={7}>
                        <RankingTable />
                    </Col>
                    <Col md={12} lg={5}>
                        <WeekGames />
                    </Col>
                </Row>
            </Container>
        );
    }
};

const styles = {
    container: {
        marginTop: 15,
        marginBottom: 15
    }
};

const mapStateToProps = (state) => {
    return {
        ranking: matchesByTeam(state)
    };
}

export default connect(mapStateToProps, { fetchMatches, fetchTeams })(Ranking);