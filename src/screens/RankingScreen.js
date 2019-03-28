import React, {
    Component
} from 'react';
import {
    Container,
    Row,
    Col,
    Card
} from 'react-bootstrap';
import {
    connect
} from 'react-redux';
import {
    fetch as fetchTeams
} from '../actions/teamsAction';
import {
    fetch as fetchWeeks
} from '../actions/weeksAction';
import RankingTable from '../components/RankingTable';
import WeekGames from '../components/WeekGames';
import LegendBox from '../components/LegendBox';

class Ranking extends Component {
    
    componentDidMount() {
        this.refreshData();
    }

    refreshData = () => this.props.fetchTeams().then(this.props.fetchWeeks);

    render() {
        return (
            <Container>
                <Row style={styles.container}>
                    <Col md={12} lg={7}>
                        <Card>
                            <RankingTable refreshData={this.refreshData} />
                        </Card>
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

export default connect(null, { fetchWeeks, fetchTeams })(Ranking);