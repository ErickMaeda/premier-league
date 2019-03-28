import React, {
    Component
} from 'react';
import {
    Container,
    Row,
    Card,
    Col,
    CardDeck,
    Breadcrumb
} from 'react-bootstrap';
import {
    connect
} from 'react-redux';
import {
    getTeams
} from '../selectors/teamsSelector';
import { Link } from 'react-router-dom';

class Teams extends Component {

    renderBreadCrumb = () => {
        return (
            <Breadcrumb>
                <Breadcrumb.Item href="#/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Teams</Breadcrumb.Item>
            </Breadcrumb>
        )
    }
    
    renderTeam = (team, index) => {
        return (
            <Col xs={12} sm={6} md={4} lg={3} key={index} style={styles.containerCard} className="justify-content-center">
                <Card>
                    <Card.Header>
                        <Row className="justify-content-center">
                            <Card.Link className="text-center" href={`#teams/${index}`}>{team.name}</Card.Link>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Row className="justify-content-center">
                            <Link to={`/teams/${index}`}>
                                <Card.Img variant="top" src={team.logo} style={styles.logo}/>
                            </Link>
                        </Row>
                    </Card.Body>
                </Card>
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
                        {this.renderBreadCrumb()}
                    </Col>
                </Row>
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