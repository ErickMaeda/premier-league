import React from 'react';
import {
    Card,
    Button
} from 'react-bootstrap';
import {
    connect
} from 'react-redux';

class WeekGames extends React.PureComponent {

    onClickNavigateBack = () => {

    };
    
    onClickNavigateNext = () => {
        
    };

    render() {
        return (
            <Card>
                <Card.Header>
                    <div className="container">
                        Week <strong>#1</strong><span className="float-right"><Button variant="outline-dark" onClick={this.onClickNavigateBack}>{'<'}</Button> <Button variant="outline-dark" onClick={this.onClickNavigateNext}>{'>'}</Button></span>
                    </div>
                </Card.Header>
                <Card.Body>
                    <span>Manchester United 9 x 1 Burninghton</span>
                </Card.Body>
            </Card>
        );
    };
};

const styles = {
    title: {
        alignSelf: 'right',
        backgroundColor: 'red'
    }
};

const mapStateToProps = (state: Array): Object => {
    return {
    };
}

export default connect(mapStateToProps)(WeekGames);