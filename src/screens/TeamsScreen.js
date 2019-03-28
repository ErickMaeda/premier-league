import React, {
    Component
} from 'react';
import {
    Container,
    Row,
    Card,
    Col,
    CardDeck
} from 'react-bootstrap';
import {
    connect
} from 'react-redux';
import {
    getTeams
} from '../selectors/teamsSelector';
import { Link } from 'react-router-dom';

class Teams extends Component {

    renderTeam = (team, index) => {
        return (
            <Col xs={6} sm={4} md={3} key={index} style={styles.containerCard} className="justify-content-center">
                <Row className="justify-content-center">
                    <Link to={`/teams/${index}`}>
                        <Card.Img variant="top" src={team.logo} style={styles.logo}/>
                    </Link>
                </Row>
                <Row className="justify-content-center">
                    <Card.Link className="text-center" href={`#teams/${index}`}>{team.name}</Card.Link>
                </Row>
            </Col>
        );
    }

    renderTeams = () => {
        const {
            teams
        } = this.props;

        return (
            <CardDeck style={styles.container}>
                <Row className="justify-content-center">
                    {teams.map(this.renderTeam)}
                </Row>
            </CardDeck>
        );
    }

    render() {
        return (
            <Container style={styles.container}>
                <Row>
                    <Col md={12}>
                        {this.renderTeams()}
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
    containerCard: {
        marginTop: 15,
        marginBottom: 15
    },
    logo: {
        height: 80,
        width: 80
    }
};

const mapStateToProps = () => {
    return {
        teams: getTeams()
    };
};

export default connect(mapStateToProps)(Teams);