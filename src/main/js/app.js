import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reducer from "./redux/reducer"
import thunk from "redux-thunk"
import {initialState} from "./redux/reducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import MainPage from "./components/MainPage";
import LoginForm from "./components/auth/LoginForm";
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import RegistrationForm from "./components/auth/RegistrationForm";
import RegistrationConfirmation from "./components/auth/RegistrationConfirmation";

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
                    <Route exact path={"/register"} component={RegistrationForm} />
                    <Route path={"/register/confirm/:token"} component={RegistrationConfirmation} />
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