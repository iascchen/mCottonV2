import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

class App extends Component {
render() {
    return (
        <div className="container">
            <header>
                <h1>MQTT Server</h1>
            </header>

            <div>
                MQTT Server is running on port 1883 !
            </div>
        </div>
    );
}
}

Meteor.startup(() => {
    render(<App />, document.getElementById('render-target'));
});