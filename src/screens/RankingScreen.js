import React, {
    Component
} from 'react';

class Ranking extends Component {

    renderRankingTable = () => {

    }

    render() {
        return (
            <div className="container" style={styles.container}>
                <div className="row">
                    <div className="col-md-9">
                        <span>Table</span>
                    </div>
                    <div className="col-md-3">
                        <span>Weeks</span>
                    </div>
                </div>
            </div>
        );
    }
};

const styles = {
    container: {
        backgroundColor: '#fff',
        marginTop: 20
    }
};
  
export default Ranking;