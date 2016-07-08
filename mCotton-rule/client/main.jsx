import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

class App extends Component {
render() {
    return (
        <div className="container">
            <header>
                <h1>Rule Engine</h1>
            </header>

            <div>
                Rule Engine is running!
            </div>
        </div>
    );
}
}

Meteor.startup(() => {
    render(<App />, document.getElementById('render-target'));
});