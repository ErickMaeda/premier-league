import React, {
    Component
} from 'react';
import {
    Container,
    Row,
    ListGroup,
    Card,
    Col
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

class Team extends Component {

    renderResults = (match, index) => {
        return (
            <ListGroup.Item>
                <Result 
                    game={match}
                    team={this.props.team}
                    showFullName
                    index={index}
                />
            </ListGroup.Item>
        );
    };

    render() {
        console.log('props', this.props);
        
        return (
            <Container>
                <Row style={styles.container}>
                    <Col md={12}>
                        <Card>
                            <Card.Header style={{flex: 1}}>
                                <span className="text-center" style={{alignSelf: 'center'}}>Games on current Season</span>
                            </Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    {this.props.teamRanking.matches.map(this.renderResults)}
                                </ListGroup>
                            </Card.Body>
                        </Card>
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

export default connect(mapStateToProps)(Team);