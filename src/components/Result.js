import React from 'react';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';
import {
    connect
} from 'react-redux';
import {
    getTeam
} from '../selectors/teamsSelector';

class Result extends React.PureComponent {

    render() {
        const {
            game
        } = this.props;

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

export default connect()(Result);