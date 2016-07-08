/**
 * Created by chenhao on 16/6/18.
 */

import React, { Component, PropTypes } from 'react';

class LifeCycle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value
        };
    }

    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps');
        this.setState({
            value: nextProps.value
        });
    }

    shouldComponentUpdate(nextProps,nextState){
        console.log('shouldComponentUpdate');
        return true;
    }

    componentWillUpdate(nextProps,nextState){
        console.log('componentWillUpdate');
    }

    componentWillMount(){
        console.log('componentWillMount');
    }

    render() {
        console.log('render');
        return <span>{this.state.value}</span>
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    componentDidUpdate(prevProps,prevState) {
        console.log('componentDidUpdate');
    }

    componentWillUnmount(prevProps,prevState) {
        console.log('componentWillUnmount');
    }
}

LifeCycle.propTypes = {

    // This component gets the task to display through a React prop.

    // We can use propTypes to indicate it is required

    value: PropTypes.string.isRequired,

};

export default LifeCycle;