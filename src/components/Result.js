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
import withSizeDetectionHoc from '../hocs/withSizeDetectionHoc';

class Result extends React.PureComponent {

    render() {        
        const {
            game,
            showFullName,
            index,
            isMobile
        } = this.props;

        if (!game) {
            throw new Error('Param $game not found!');
        }
        const homeTeamGoals = game.score[0];
        const awayTeamGoals = game.score[1];
        
        
        const homeTeam = getTeam(game.teamIds[0]) || {};
        const awayTeam = getTeam(game.teamIds[1]) || {};
        
        let homeTeamName = (showFullName && !isMobile) ? homeTeam.name : homeTeam.shortName;
        let awayTeamName = (showFullName && !isMobile) ? awayTeam.name : awayTeam.shortName;
        
        let homeTeamBold = homeTeamGoals > awayTeamGoals;
        let awayTeamBold = awayTeamGoals > homeTeamGoals;

        return (
            <Container key={index}>
                <Row>
                    <Col xs={3} className="text-right">
                        {homeTeamBold ? (<span style={styles.textWinner}>{homeTeamName}</span>) : homeTeamName}
                    </Col>
                    <Col xs={6} className="text-center">
                        <img 
                            style={styles.logo} 
                            src={homeTeam.logo}
                            alt={`${homeTeam.name} Logo`}
                        />
                        &nbsp;
                        <span style={styles.textScoreBoard}>{homeTeamGoals} x {awayTeamGoals}</span>
                        &nbsp;
                        <img 
                            style={styles.logo} 
                            src={awayTeam.logo}
                            alt={`${awayTeam.name} Logo`}
                        />
                    </Col>
                    <Col xs={3} className="text-left">
                        {awayTeamBold ? (<span style={styles.textWinner}>{awayTeamName}</span>) : awayTeamName}
                    </Col>
                </Row>
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

export default connect()(withSizeDetectionHoc(Result));