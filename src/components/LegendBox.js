import React from 'react';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';
import {
    connect
} from 'react-redux';

class LegendBox extends React.PureComponent {
    
    renderLegend = (legend) => {
        return (
            <Col md={4}>
                <Row className="justify-content-center">
                    <Row>
                        <div style={{...styles.circle, backgroundColor: legend.color}}></div>
                    </Row>
                    <Row>
                        <span style={styles.description}>{legend.description}</span>
                    </Row>
                </Row>
            </Col>
        );
    }

    render() {
        return (
            <Container className="justify-content-center" style={styles.container}>
                <Row className="justify-content-center">
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
        borderRadius: 25,
        padding: 10,
        display: 'inline-block'
    },
    description: {
        fontSize: 12,
        marginLeft: 40,
        marginBottom: 30
    }
};

export default connect()(LegendBox);