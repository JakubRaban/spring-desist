import React from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import LockActivateModal from "./LockActivateModal";
import {connect} from 'react-redux'
import {activateLock} from "../redux/actions";

class CreatedLockActions extends React.Component {

    activateModalRef = React.createRef()

    onActivateClick = () => {
        this.activateModalRef.current.show();
    }

    onActivateLock = timeInSeconds => {
        this.props.activateLock(this.props.lock, timeInSeconds)
    }

    render() {
        return (
            <>
                <LockActivateModal lock={this.props.lock} ref={this.activateModalRef} activateCallback={this.onActivateLock}/>
                <ButtonGroup size={"sm"}>
                    <Button variant={"success"} onClick={this.onActivateClick}>Activate</Button>
                    <Button variant={"secondary"}>Copy password</Button>
                    <Button variant={"danger"}>Delete</Button>
                </ButtonGroup>
            </>
        )
    }

}

export default connect(null, {activateLock})(CreatedLockActions);