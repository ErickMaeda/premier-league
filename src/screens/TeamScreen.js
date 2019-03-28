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
import withSizeDetectionHoc from '../hocs/withSizeDetectionHoc';

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

    renderContentDesktopOrTablet = () => {
        return (
            <Card>
                <Card.Header className="text-center">
                    <span>Games on current Season</span>
                </Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        {this.props.teamRanking.matches.map(this.renderResults)}
                    </ListGroup>
                </Card.Body>
            </Card>
        );
    }

    renderContentMobile = () => {
        return (
            <div>
                <h4 className="text-center">Games on current Season</h4>
                <ListGroup variant="flush">
                    {this.props.teamRanking.matches.map(this.renderResults)}
                </ListGroup>
            </div>
        )
    }

    render() {        
        return (
            <Container>
                <Row style={styles.container}>
                    <Col md={12}>
                        {this.props.isMobile ? this.renderContentMobile() : this.renderContentDesktopOrTablet()}
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

export default connect(mapStateToProps)(withSizeDetectionHoc(Team));