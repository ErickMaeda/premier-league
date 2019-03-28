import React, {
    Component
} from 'react';
import {
    Container,
    Row,
    ListGroup,
    Card,
    Col,
    Spinner
} from 'react-bootstrap';
import {
    connect
} from 'react-redux';
import Result from '../components/Result';
import {
    getRankingTeam
} from '../selectors/rankingSelector';
import {
    getTeam
} from '../selectors/teamsSelector';
import {
    getColorByPosition
} from '../helpers/RankingHelper';
import withSizeDetectionHoc from '../hocs/withSizeDetectionHoc';
import { Chart } from "react-google-charts";

class Team extends Component {

    renderResults = (match, index) => {
        return (
            <ListGroup.Item key={index}>
                <Result
                    game={match}
                    team={this.props.team}
                    index={index}
                    showFullName
                />
            </ListGroup.Item>
        );
    };

    renderWeekGamesDesktopOrTablet = () => {
        return (
            <Card>
                <Card.Header className="text-center">
                    <span>Weeks Season</span>
                </Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        {this.props.teamRanking.matches.map(this.renderResults)}
                    </ListGroup>
                </Card.Body>
            </Card>
        );
    }

    renderWeekGamesMobile = () => {
        return (
            <div>
                <h4 className="text-center">Games on current Season</h4>
                <ListGroup variant="flush">
                    {this.props.teamRanking.matches.map(this.renderResults)}
                </ListGroup>
            </div>
        )
    }

    /**
     * Calculate and render the chart
     * with the increased points
     */
    renderChartWins = () => {

        const {
            teamRanking
        } = this.props;

        let points = 0;
        const data = teamRanking.matches.map((match, index) => {
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
            return [
                (index + 1),
                points
            ];
        });

        return (
            <Chart
                chartType="LineChart"
                data={[["Matches", "Points"], [0,0], ...data]}
                width="100%"
                loader={<Spinner/>}
                height="400px"
                legendToggle
            />
        );
    }

    renderTeamStats = () => {
        const {
            team
        } = this.props;
        const {
            teamRanking
        } = this.props;

        const maxPoints = ((teamRanking.drawns + teamRanking.wins + teamRanking.losses) * 3);
        const maxPointsRate = ((teamRanking.points * 100) / maxPoints);

        return (
            <Container style={styles.containerHeader}>
                <Row className="justify-content-center" style={styles.container}>
                    <h3>Season Stats</h3>
                </Row>
                <Row style={styles.container}>
                    <Col xs={12} sm={6} md={3}>
                        <Row className="justify-content-center" style={styles.container}>
                            <img
                                src={team.logo}
                                alt={team.name}
                            />
                        </Row>
                        <Row className="justify-content-center" style={styles.container}>
                            <h5>{team.name}</h5>
                        </Row>
                    </Col>
                    <Col sm={6} md={9}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col md={4}>Season Ranking</Col>
                                    <Col md={{ span: 4, offset: 4 }}>
                                        <strong style={{ color: getColorByPosition(teamRanking.ranking) }}>{teamRanking.ranking}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={4}>Max Points Rate</Col>
                                    <Col md={{ span: 4, offset: 4 }}>
                                        <strong>{maxPointsRate.toFixed(2)}%</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={4}>Victories</Col>
                                    <Col md={{ span: 4, offset: 4 }}>
                                        <strong>{teamRanking.wins}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={4}>Goals Difference</Col>
                                    <Col md={{ span: 4, offset: 4 }}>
                                        <strong>{teamRanking.goalsDifference}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                <Row>
                    {this.renderChartWins()}
                </Row>
            </Container>
        );
    }

    render() {
        return (
            <Container style={styles.container}>
                <Row>
                    <Col md={12}>
                        {this.renderTeamStats()}
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {this.props.isMobile ? this.renderWeekGamesMobile() : this.renderWeekGamesDesktopOrTablet()}
                    </Col>
                </Row>
            </Container>
        );
    };
};

const styles = {
    container: {
        marginTop: 15,
        marginBottom: 15
    },
    containerHeader: {
        marginTop: 30,
        marginBottom: 30
    },
    logo: {
        height: 50,
        width: 50
    }
};

const mapStateToProps = (state, props) => {
    const {
        match: {
            params: {
                id
            }
        }
    } = props;

    return {
        team: getTeam(id),
        teamRanking: getRankingTeam(id)
    };
};

export default connect(mapStateToProps)(withSizeDetectionHoc(Team));