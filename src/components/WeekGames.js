import React, {
    Component
} from 'react';
import {
    Card,
    Button,
    Container,
    Row,
    Col
} from 'react-bootstrap';
import {
    connect
} from 'react-redux';
import {
    gamesOfTheWeek
} from '../selectors/matchesSelector';
import {
    teamLogo,
    teamShortName
} from '../selectors/teamsSelector';
import {
    data as weekSelected
} from '../selectors/weekSelectedSelector';
import {
    select as selectWeek,
    selectPreviousWeek,
    selectNextWeek
} from '../actions/weekSelectedAction';
import {
    truncate
} from '../helpers/Utils';

class WeekGames extends React.PureComponent {
    
    onClickNavigateBack = () => this.props.selectPreviousWeek();
    
    onClickNavigateNext = () => this.props.selectNextWeek();

    renderResults = (game, index) => {        
        const {
            HomeTeam: homeTeam,
            AwayTeam: awayTeam,
            FTHG: homeTeamGoals,
            FTAG: awayTeamGoals,
            Date: date
        } = game;

        const homeTeamBold = homeTeamGoals > awayTeamGoals;
        const awayTeamBold = awayTeamGoals > homeTeamGoals;

        return (
            <Container key={index}>
                <Row>
                    <Col xs={3} className="text-right">
                        {homeTeamBold ? (<strong>{truncate(teamShortName(this.props.state, homeTeam), 8)}</strong>) : (truncate(teamShortName(this.props.state, homeTeam), 8))}
                    </Col>
                    <Col xs={6} className="text-center">
                        <img 
                            style={styles.logo} 
                            src={teamLogo(this.props.state, homeTeam)}
                        />
                        &nbsp;
                        {homeTeamGoals} x {awayTeamGoals}
                        &nbsp;
                        <img 
                            style={styles.logo} 
                            src={teamLogo(this.props.state, awayTeam)}
                        />
                    </Col>
                    <Col xs={3} className="text-left">
                        {awayTeamBold ? (<strong>{truncate(teamShortName(this.props.state, awayTeam), 8)}</strong>) : (truncate(teamShortName(this.props.state, awayTeam), 8))}
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
                    <Button 
                        variant="light" 
                        onClick={this.onClickNavigateBack}
                    >
                        {'<'}
                    </Button>
                </Col>
                <Col className="text-center" style={{alignSelf: 'center'}}>Week <strong>#{this.props.week}</strong></Col>
                <Col className="text-right float-right">
                    <Button 
                        variant="light" 
                        onClick={this.onClickNavigateNext}
                    >
                        {'>'} 
                    </Button>
                </Col>
                <Row style={{marginTop: 15, marginBottom: 15}}>
                    {this.props.weekGame.map(this.renderResults)}
                </Row>
            </Row>
        );
    };
};

const styles = {
    text: {
        fontSize: 14
    },    
    logo: {
        height: 30,
        width: 30,
        padding: 2
    }
};

const mapStateToProps = (state: Array) => {
    const week = weekSelected(state);

    return {
        weekGame: gamesOfTheWeek(state, week),
        week,
        state
    };
}

export default connect(mapStateToProps, {selectWeek, selectPreviousWeek, selectNextWeek})(WeekGames);