import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {locks: []};
    }

    componentDidMount() {
        fetch('https://localhost:8080')
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