import React, {
    Component
} from 'react';
import {
    Button,
    Container,
    Row,
    Col,
    Card
} from 'react-bootstrap';
import {
    connect
} from 'react-redux';

class LegendBox extends React.PureComponent {
    
    renderLegend = (legend) => {
        return (
            <Row>
                <Col>
                    <div style={{...styles.circle, backgroundColor: legend.color}}></div>
                </Col>
                <Col>
                    {legend.description}
                </Col>
            </Row>
        );
    }

    render() {
        return (
            <Container style={styles.container}>
                <Row>
                    {this.props.legends.map(this.renderLegend)}
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
    circle: {
        height: 15,
        width: 15,
        borderRadius: 50,
        margin: 10
    }
};

const mapStateToProps = (state: Array) => {
    return {
    };
}

export default connect(mapStateToProps)(LegendBox);