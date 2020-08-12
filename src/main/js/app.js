const React = require('react')
const ReactDOM = require('react-dom')

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {locks: []};
    }

    componentDidMount() {

    }

    render() {
        return (
            <b>abc</b>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)