import React from 'react';

export default (WrappedComponent) => {

    class EnhancedComponent extends React.Component {

        constructor(props) {
            super(props);

            this.state = {
                width: window.innerWidth,
                height: window.innerHeight
            };
        }

        componentWillMount() {
            window.addEventListener('resize', this.handleWindowSizeChange);
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.handleWindowSizeChange);
        }

        handleWindowSizeChange = () => {
            this.setState({ 
                width: window.innerWidth,
                height: window.innerHeight
            });
        };


        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    windowHeight={this.state.height}
                    windowWidth={this.state.width}
                    isMobile={this.state.width <= 500}
                    isTablet={this.state.width > 500 && this.state.width <= 979}
                    isDesktop={this.state.width > 980}
                />
            )
        }
    }

    return EnhancedComponent;
};