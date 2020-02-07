import React, { Component } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetch as fetchTeams } from '../actions/teamsAction';
import { fetch as fetchWeeks } from '../actions/weeksAction';
import RankingTable from '../components/RankingTable';
import WeekGames from '../components/WeekGames';
import LegendBox from '../components/LegendBox';
import Banner from '../components/Banner';
import Loading from '../components/Loading';
import withSizeDetectionHoc from '../hocs/withSizeDetectionHoc';
import withHeaderHoc from '../hocs/withHeaderHoc';
import { getRanking } from '../selectors/rankingSelector';
import { getWeeks } from '../selectors/weeksSelector';
import { getTeams } from '../selectors/teamsSelector';
import { getAllBackgroundColorsAndDescription } from '../helpers/RankingHelper';
import { compose } from 'redux'
import { Chart } from "react-google-charts";

class Ranking extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            showBoxTryAgain: false
        };
    };

    componentDidMount() {
        this.refreshData();
    };

    refreshData = () => {
        this.setState({ isLoading: true, showBoxTryAgain: false }, () => {
            this.props
                .fetchTeams()
                .then(this.props.fetchWeeks)
                .then(() => this.setState({ isLoading: false }))
                .catch(() => {
                    this.setState({ isLoading: false, showBoxTryAgain: true });
                });
        });
    };

    /**
     * Calculate and render the chart
     * with the increased points
     */
    renderChartWins = () => {

        const {
            ranking,
            weeks
        } = this.props;


        const teamNames = ranking.slice(0, 5).map((teamRanking) => teamRanking.name);

        const teamsWeeks = ranking.slice(0, 5).map((teamRanking, teamRankingIndex) => {
            let points = 0;
            const temporary = teamRanking.matches.map((match, index) => {
                let currentTeamIndex;
                let againstTeamIndex;
                if (match.teamIds[0] === teamRanking.id) {
                    currentTeamIndex = 0;
                    againstTeamIndex = 1;
                } else {
                    currentTeamIndex = 1;
                    againstTeamIndex = 0;
                }
                if (match.score[currentTeamIndex] > match.score[againstTeamIndex]) {
                    points = points + 3;
                } else if (match.score[currentTeamIndex] === match.score[againstTeamIndex]) {
                    points++;
                }
                return points;
            });
            return temporary;
        });

        const weeksGraph = weeks.map((week, index) => {
            const temporary = teamsWeeks.map((week) => {
                return week[index];
            });
            temporary.unshift(index + 1);
            return temporary;
        });

        const data = [["Week", ...teamNames], [0, 0, 0, 0, 0, 0], ...weeksGraph];

        return (
            <Chart
                chartType="Line"
                data={data}
                width="100%"
                loader={<Spinner />}
                height="400px"
                legendToggle
            />
        );
    }

    renderTryAgain = () => {
        return (
            <Banner
                messageComponent={
                    <span className="text-center">Something went wrong. Do you want to <Alert.Link onClick={this.refreshData}>try again?</Alert.Link></span>
                }
            />
        );
    };

    renderLoading = () => {
        return (
            <Loading />
        );
    };

    render() {

        const {
            isMobile
        } = this.props;
        const {
            isLoading,
            showBoxTryAgain
        } = this.state;

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
                    <Row>
                        {isLoading ? this.renderLoading() : null}
                        {showBoxTryAgain ? this.renderTryAgain() : null}
                    </Row>
                    <Row>
                        <Col style={styles.colWithoutPadding}>
                            {rankingTableComponent}
                        </Col>
                        <Col style={styles.colWithoutPadding}>
                            {weekGamesComponent}
                        </Col>
                    </Row>
                </Container>
            );
        }
        return (
            <Container style={styles.container}>
                <Row>
                    {isLoading ? this.renderLoading() : null}
                    {showBoxTryAgain ? this.renderTryAgain() : null}
                </Row>
                <Row style={styles.container}>
                    <Col md={12} lg={7}>
                        <Card>{rankingTableComponent}</Card>
                    </Col>
                    <Col md={12} lg={5}>
                        <Card>
                            <Card>{weekGamesComponent}</Card>
                        </Card>
                    </Col>
                </Row>
                <Row style={styles.container}>
                    <Col md={12}>
                        <Card>
                            <Card.Header>
                                The best 5 Scores
                            </Card.Header>
                            <Card.Body>
                                {this.renderChartWins()}
                            </Card.Body>
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

const mapStateToProps = () => {
    return {
        ranking: getRanking(),
        weeks: getWeeks(),
        teams: getTeams()
    };
};

export default connect(mapStateToProps, { fetchWeeks, fetchTeams })(compose(withHeaderHoc, withSizeDetectionHoc)(Ranking));
