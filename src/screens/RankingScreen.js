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
import { fetch as fetchTeams } from '../actions/teamsAction';
import { fetch as fetchWeeks } from '../actions/weeksAction';
import RankingTable from '../components/RankingTable';
import WeekGames from '../components/WeekGames';
import LegendBox from '../components/LegendBox';
import withSizeDetectionHoc from '../hocs/withSizeDetectionHoc';
import { getRanking } from '../selectors/rankingSelector';
import { getWeeks } from '../selectors/weeksSelector';
import { getTeams } from '../selectors/teamsSelector';
import { getAllBackgroundColorsAndDescription } from '../helpers/RankingHelper';

class Ranking extends Component {

    componentDidMount() {
        this.refreshData();
    }

    refreshData = () => this.props.fetchTeams().then(this.props.fetchWeeks);

    render() {

        const {
            isMobile
        } = this.props;

        const rankingTableComponent = (
            <div>
                <RankingTable refreshData={this.refreshData} />
                <LegendBox legends={getAllBackgroundColorsAndDescription()} />
            </div>
        );
        const weekGamesComponent = <WeekGames />;

        if (isMobile) {
            return (
                <Container style={styles.container}>
                    <Col style={styles.colWithoutPadding}>
                        {rankingTableComponent}
                    </Col>
                    <Col style={styles.colWithoutPadding}>
                        {weekGamesComponent}
                    </Col>
                </Container>
            );
        }
        return (
            <Container style={styles.container}>
                <Row>
                    <Col md={12} lg={7}>
                        <Card>{rankingTableComponent}</Card>
                    </Col>
                    <Col md={12} lg={5}>
                        <Card>
                            <Card>{weekGamesComponent}</Card>
                        </Card>
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
    },
    colWithoutPadding: {
        paddingLeft: 0,
        paddingRight: 0
    }
};

const mapStateToProps = (state) => {
    return {
        ranking: getRanking(),
        weeks: getWeeks(),
        teams: getTeams()
    };
};

export default connect(mapStateToProps, { fetchWeeks, fetchTeams })(withSizeDetectionHoc(Ranking));