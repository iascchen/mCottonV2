import Pager from 'material-ui/Paper';
import React, {Component, PropTypes} from 'react';

const containerStyle = {
    margin: 10,
    width: '100%',
};
const paperStyle = {
    margin: 0,
    padding: 5,
    textAlign: 'center',
    display: 'block',
    height: '100%',
};
export default class MPaper extends Component {
    render() {
        return (
            <div className="PagerContainer" style={containerStyle}>
                <Pager style={paperStyle} zDepth={2}>
                    {this.props.children}
                </Pager>
            </div>
        );
    }
}
