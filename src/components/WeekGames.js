import React, {
    Component
} from 'react';
import {
    Card,
    Button
} from 'react-bootstrap';
import {
    connect
} from 'react-redux';
import {
    gamesOfTheWeek
} from '../selectors/matchesSelector';
import {
    teamLogo
} from '../selectors/teamsSelector';

class WeekGames extends React.PureComponent {
    
    onClickNavigateBack = () => {

    };
    
    onClickNavigateNext = () => {
        
    };

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
            <div key={index}>
                <div  className="row">
                    <div className="col-md-4">
                        <span style={{textAlign: 'right' , fontSize: 13}} className="float-right">
                            {homeTeamBold ? (<strong>{homeTeam}</strong>) : (homeTeam)}
                        </span>
                    </div>
                    <div className="col-md-4" className="text-center">
                        <img 
                            style={styles.logo} 
                            src={teamLogo(this.props.state, homeTeam)}
                        />
                        {homeTeamGoals}
                        <span>  x  </span>
                        {awayTeamGoals}
                        <img 
                            style={styles.logo} 
                            src={teamLogo(this.props.state, awayTeam)}
                        />
                    </div>
                    <div className="col-md-4">
                        <span style={{textAlign: 'left', fontSize: 13}} className="float-left">
                            {awayTeamBold ? (<strong>{awayTeam}</strong>) : (awayTeam)}
                        </span>
                    </div>
                </div>
                <hr/>
            </div>
        )
    }

    render() {
        return (
            <Card>
                <Card.Header>
                    <div className="container">
                        Week <strong>#1</strong>
                        <span className="float-right">
                            <Button 
                                variant="outline-dark" 
                                onClick={this.onClickNavigateBack}
                            >
                                {'<'}
                            </Button> 
                            &emsp;
                            <Button 
                                variant="outline-dark" 
                                onClick={this.onClickNavigateNext}
                            >
                                {'>'} 
                            </Button>
                        </span>
                    </div>
                </Card.Header>
                <Card.Body>
                    {this.props.weekGame.map(this.renderResults)}
                </Card.Body>
            </Card>
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
        padding: 5
    }
};

const mapStateToProps = (state: Array) => {
    return {
        weekGame: gamesOfTheWeek(state, 1),
        state 
    };
}

export default connect(mapStateToProps)(WeekGames);