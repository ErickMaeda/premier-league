import React, {
    Component
} from 'react';
import {
    Container,
    Row
} from 'react-bootstrap';
import {
    connect
} from 'react-redux';

class Team extends Component {

    render() {
        console.log('props', this.props);
        
        return (
            <Container>
                <Row style={styles.container}>

                </Row>
            </Container>
        );
    }
};

const styles = {
    container: {
        marginTop: 15,
        marginBottom: 15
    }
};

const mapStateToProps = (state) => {
    console.log('state', state);
        
    return {

    }; 
};

export default connect(mapStateToProps)(Team);