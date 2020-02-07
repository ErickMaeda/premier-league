import React from 'react';
import { Row, Spinner } from 'react-bootstrap';

export default () => {

    const styles = {
        container: {
            marginTop: 10,
            marginBottom: 10
        }
    };

    return (
        <Row className="justify-content-center" style={styles.container}>
            <Spinner animation="grow" />
        </Row>
    );
};