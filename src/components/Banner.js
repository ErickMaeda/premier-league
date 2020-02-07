import React from 'react';
import { Row, Alert } from 'react-bootstrap';

export default ({
    alertType = "warning",
    messageComponent 
}) => {

    const styles = {
        container: {
            marginTop: 10,
            marginBottom: 10
        }
    };

    return (
        <Row className="justify-content-center" style={styles.container}>
            <Alert variant={alertType}>
                {messageComponent}
            </Alert>
        </Row>
    );
};