/**
 * Created by chenhao on 16/6/18.
 */

import React, { Component, PropTypes } from 'react';
import LifeCycle from './LifeCycle';

class DestroyComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 1,
            destroyed: false
        };
    }

    increase() {
        this.setState({
            value: this.state.value + 1
        });
    }

    destroy() {
        this.setState({
            destroyed: true
        });
    }

    render() {
        if (this.state.destroyed) {
            return null;
        }

        return <div>
            <p>
                <button onClick={this.increase.bind(this)}>每次加1</button>
                <button onClick={this.destroy.bind(this)}>干掉这两个按钮</button>
            </p>
            <LifeCycle value={this.state.value}/>
        </div>;
    }
}

DestroyComponent.propTypes = {

    // This component gets the task to display through a React prop.

    // We can use propTypes to indicate it is required
    value: PropTypes.number,

};

export default DestroyComponent;