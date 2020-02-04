import React, { Component } from 'react';
import { Container, Row, Card, Col, Breadcrumb } from 'react-bootstrap';
import { connect } from 'react-redux';
import LogoSky from '../assets/sky-logo.png';
import ReactMarkdown from 'react-markdown';
import withHeaderHoc from '../hocs/withHeaderHoc';

const readme = `
    # REACT CHALLENGE

    Your mission is to improve a web application which displays the Premier League results.
    There is a public API to fetch relevant data. It's mostly set up already.

    We're providing you the initial setup and dependencies, but if you need, 
    feel free to add further dependencies while keeping the core untouched 
    (React 16, React Router 4.x, SuperAgent or similar XHR lib).

    To run the project, you need to have Node (and NPM) installed:

        npm install
        npm start


    ## Tasks to perform

    * Create the Result pure component. A winning team should have its name in bold.
    * Make weeks start in 1 instead of zero (both visually and route-wise)
    * Create a function returning clubs stats given a club's array of results
    * Create a table of results
    * Display club logos on results and team page
    * Style it the way you best see fit
    * Feel free to restructure/clean/test the code to best serve your solution


    ## API

    ## League Rules

    <https://en.wikipedia.org/wiki/Premier_League#Competition_format>
    * wins are awarded 3 points, draws 1 and losses 0
    * criteria for finding the Premier League ranking are:
    * total points
    * goal difference
    * goals scored
`;

class Team extends Component {

    renderBreadCrumb = () => {
        return (
            <Breadcrumb>
                <Breadcrumb.Item href="#/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>About</Breadcrumb.Item>
            </Breadcrumb>
        );
    };

    renderAboutProjectHistory = () => {
        return (
            <Card body>
                <Row>
                    <Col>
                        <Card.Title>What consists the project?</Card.Title>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <p><strong>Main Screen</strong> - Load the Ranking and Week Games.</p>
                        <p><strong>Teams Screen</strong> - Load all the teams on Premier League.</p>
                        <p><strong>Team Screen</strong> - Load the team stats with all the games.</p>
                        <p><strong>About Screen</strong> - Show project about, challenge proposed and project qualifications.</p>
                    </Col>
                </Row>
            </Card>
        );
    }

    renderAboutProjectHistory = () => {
        return (
            <Card body>
                <Row>
                    <Col>
                        <Card.Title>What consists the project?</Card.Title>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <p><strong>Main Screen</strong> - Load the Ranking and Week Games.</p>
                        <p><strong>Teams Screen</strong> - Load all the teams on Premier League.</p>
                        <p><strong>Team Screen</strong> - Load the team stats with all the games.</p>
                        <p><strong>About Screen</strong> - Show project about, challenge proposed and project qualifications.</p>
                    </Col>
                </Row>
            </Card>
        );
    }

    renderAboutProjectTechnologies = () => {
        return (
            <Card body>
                <Row>
                    <Col>
                        <Card.Title>What was used in this test?</Card.Title>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <p><strong>Redux</strong> - I use redux because I'd like to share around the project my current state.</p>
                        <p><strong>Redux Thunk</strong> - The middleware for Redux to make async dispatchs.</p>
                        <p><strong>Redux Persist</strong> - I want to load all the data as soon as possible. so I have persisted all the reducers, while I'm refreshing the data at the shadow</p>
                        <p><strong>Axios</strong> - There's no much difference between Axios and SuperAgent http request. I just choose Axios because of the popularity.</p>
                        <p><strong>Bootstrap</strong> - All the project was made with Bootstrap features.</p>
                        <p><strong>React Google Charts</strong> - Was used to implement the team increase points along the season.</p>
                        <p><strong>React Markdown</strong> - Only prints the README.md test here.</p>
                    </Col>
                </Row>
            </Card>
        );
    }

    renderReadme = () => {
        return (
            <Card body>
                <Row>
                    <Col>
                        <Card.Title>Challenge</Card.Title>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <ReactMarkdown source={readme} />
                    </Col>
                </Row>
            </Card>
        );
    }

    renderHeader = () => {
        return (
            <Card body>
                <Row>
                    <Col>
                        <a href="https://www.sky.com/">
                            <img
                                alt="Sky"
                                src={LogoSky}
                                width="120"
                                height="75"
                            />
                            <div style={styles.space} />
                            <Card.Title>Sky - React Challenge</Card.Title>
                        </a>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <div style={styles.space} />
                        <h5>Useful Links</h5>
                        <div style={styles.space} />
                        <p><a href="https://github.com/ErickMaeda/premier-league">GitHub - Repository</a></p>
                        <p><a href="https://www.linkedin.com/in/erickmaeda">LinkedIn</a></p>
                        <p><a href="http://www.erickmaeda.com.br">Challenge Demo</a></p>
                        <p><a href="https://www.sky.com/">Sky</a></p>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <div style={styles.space} />
                        <h5>Contacts</h5>
                        <div style={styles.space} />
                        <p><strong>Skype</strong>: erickmlopes</p>
                        <p><strong>Email</strong>: erick.maeda26@gmail.com</p>
                    </Col>
                </Row>
            </Card>
        );
    }

    renderSection = (component) => {
        return (
            <Row style={styles.container}>
                <Col md={12}>
                    {component}
                </Col>
            </Row>
        );
    };

    render() {
        return (
            <Container style={styles.container}>
                {this.renderSection(this.renderBreadCrumb())}
                {this.renderSection(this.renderHeader())}
                {this.renderSection(this.renderAboutProjectTechnologies())}
                {this.renderSection(this.renderAboutProjectHistory())}
                {this.renderSection(this.renderReadme())}
            </Container>
        );
    };
};

const styles = {
    container: {
        marginTop: 15,
        marginBottom: 15
    },
    space: {
        marginTop: 8,
        marginBottom: 8
    }
};

export default connect()(withHeaderHoc(Team));
