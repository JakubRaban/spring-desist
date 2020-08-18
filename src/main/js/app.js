import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reducer from "./redux/reducer"
import thunk from "redux-thunk"
import {initialState} from "./redux/reducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import MainPage from "./components/MainPage";
import PrivateRoute from "./components/auth/PrivateRoute";
import LoginForm from "./components/auth/LoginForm";

import { Switch, Route, BrowserRouter as Router} from 'react-router-dom'

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {

        return (
            <Router>
                <Switch>
                    <Route exact path={"/login"} component={LoginForm} />
                    <Route exact path={"/"} component={MainPage} />
                </Switch>
            </Router>
        )

    }
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('react')
)