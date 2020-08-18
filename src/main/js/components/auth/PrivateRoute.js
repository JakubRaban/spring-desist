import React from 'react';
import {Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux'

const PrivateRoute = ({component: Component, isLoggedIn, ...rest}) => {

    return (
        <Route
            {...rest}
            render={props => {
                if (props.isLoggedIn) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={"/login"}/>
                }
            }}
        />
    )
}

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn
});

export default connect(mapStateToProps)(PrivateRoute);