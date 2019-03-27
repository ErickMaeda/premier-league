import React from 'react';
import {
    Button,
    Container,
    Row,
    Col
} from 'react-bootstrap';
import {
    connect
} from 'react-redux';
import {
    getWeek,
    getWeeks
} from '../selectors/weeksSelector';
import {
    getTeams
} from '../selectors/teamsSelector';
import {
    data as weekSelected
} from '../selectors/weekSelectedSelector';
import {
    selectPreviousWeek,
    selectNextWeek
} from '../actions/weekSelectedAction';
import Result from '../components/Result';

class WeekGames extends React.PureComponent {

    onClickNavigateBack = () => this.props.selectPreviousWeek();

    onClickNavigateNext = () => this.props.selectNextWeek();

    renderResults = (game, index) => {
        return (
            <Container key={index}>
                <Result
                    game={game}
                    index={index}
                />
                <hr />
            </Container>
        )
    }

    render() {
        return (
            <Row>
                <Col className="text-left float-left">
                    { // Hide back button if already in first week
                        this.props.week !== 1 &&
                        <Button
                            variant="light"
                            onClick={this.onClickNavigateBack}
                            disabled={this.props.week === 1}
                        >
                            {'<'}
                        </Button>
                    }
                </Col>
                <Col className="text-center" style={{ alignSelf: 'center' }}>Week <strong>#{this.props.week}</strong></Col>
                <Col className="text-right float-right">
                    { // Hide next button if already in last week
                        this.props.week !== (this.props.weeks.length - 1) &&
                        <Button
                            variant="light"
                            onClick={this.onClickNavigateNext}
                        >
                            {'>'}
                        </Button>
                    }
                </Col>
                <Row style={{ marginTop: 15, marginBottom: 15 }}>
                    {this.props.weekGame.map(this.renderResults)}
                </Row>
            </Row>
        );
    };
};

const mapStateToProps = (state) => {
    const week = weekSelected(state);

    return {
        weeks: getWeeks(),
        weekGame: getWeek(week),
        week,
        teams: getTeams()
    };
}

export default connect(mapStateToProps, { selectPreviousWeek, selectNextWeek })(WeekGames);