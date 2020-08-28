import React from "react";
import {connect} from "react-redux"
import {confirmRegistration} from "../../redux/actions";
import * as OperationPhase from "../../OperationPhase"
import {Link} from "react-router-dom"

class RegistrationConfirmation extends React.Component {

    constructor(props) {
        super(props)
        this.props.confirmRegistration(this.props.match.params.token)
    }

    render() {
        return (
            <>
                {this.props.registrationConfirmationPhase === OperationPhase.INIT ? <h1>Activating your account</h1> :
                    this.props.registrationConfirmationPhase === OperationPhase.SUCCESS ?
                        <><h1>Account successfully activated.</h1><h2>You can now <Link
                            to={"/login"}>login</Link></h2></> :
                        <><h1>Activation failed.</h1><h2>Please check whether the address is correct</h2></>}
            </>
        )
    }
}

const mapStateToProps = state => ({
    registrationConfirmationPhase: state.registrationConfirmationPhase
})

export default connect(mapStateToProps, {confirmRegistration})(RegistrationConfirmation);