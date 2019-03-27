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
    getTeams,
    getTeam
} from '../selectors/teamsSelector';
import {
    data as weekSelected
} from '../selectors/weekSelectedSelector';
import {
    selectPreviousWeek,
    selectNextWeek
} from '../actions/weekSelectedAction';

class WeekGames extends React.PureComponent {
    
    onClickNavigateBack = () => this.props.selectPreviousWeek();
    
    onClickNavigateNext = () => this.props.selectNextWeek();

    renderResults = (game, index) => {
        const homeTeamGoals = game.score[0];
        const awayTeamGoals = game.score[1];
        
        const homeTeamBold = homeTeamGoals > awayTeamGoals;
        const awayTeamBold = awayTeamGoals > homeTeamGoals;

        const homeTeam = getTeam(game.teamIds[0]) || {};
        const awayTeam = getTeam(game.teamIds[1]) || {};

        return (
            <Container key={index}>
                <Row>
                    <Col xs={3} className="text-right">
                        {homeTeamBold ? (<span style={styles.textWinner}>{homeTeam.shortName}</span>) : homeTeam.shortName}
                    </Col>
                    <Col xs={6} className="text-center">
                        <img 
                            style={styles.logo} 
                            src={homeTeam.logo}
                        />
                        &nbsp;
                        <span style={styles.textScoreBoard}>{homeTeamGoals} x {awayTeamGoals}</span>
                        &nbsp;
                        <img 
                            style={styles.logo} 
                            src={awayTeam.logo}
                        />
                    </Col>
                    <Col xs={3} className="text-left">
                        {awayTeamBold ? (<span style={styles.textWinner}>{awayTeam.shortName}</span>) : awayTeam.shortName}
                    </Col>
                </Row>
                <hr/>
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
                <Col className="text-center" style={{alignSelf: 'center'}}>Week <strong>#{this.props.week}</strong></Col>
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
                <Row style={{marginTop: 15, marginBottom: 15}}>
                    {this.props.weekGame.map(this.renderResults)}
                </Row>
            </Row>
        );
    };
};

const styles = {
    textWinner: {
        fontWeight: 'bold',
        color: 'green'
    },   
    logo: {
        height: 30,
        width: 30,
        padding: 2
    },
    textScoreBoard: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 4,
        paddingRight: 4
    }
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

export default connect(mapStateToProps, {selectPreviousWeek, selectNextWeek})(WeekGames);