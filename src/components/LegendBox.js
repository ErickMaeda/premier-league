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
                    <div style={{...styles.circle, backgroundColor: legend.color}}></div>{legend.description}
                </Col>
            </Row>
        );
    }

    render() {
        return (
            <Card>
                <Card.Header>
                    Legends
                </Card.Header>
                <Card.Body>
                    <Row>
                        {this.props.legends.map(this.renderLegend)}
                    </Row>
                </Card.Body>
            </Card>
        );
    };
};

const styles = {
    circle: {
        height: 20,
        width: 20,
        borderRadius: 50
    }
};

const mapStateToProps = (state: Array) => {
    return {
    };
}

export default connect(mapStateToProps)(LegendBox);