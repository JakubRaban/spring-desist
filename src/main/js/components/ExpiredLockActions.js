import React from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'
import {openLock, activateLock, deleteLock} from "../redux/actions";
import LockOpenedModal from "./LockOpenedModal";
import LockActivateModal from "./LockActivateModal";
import LockDeleteWhenActiveModal from "./LockDeleteWhenActiveModal";
import {getLockStatus, OPENED} from "../LockStatus";

class ExpiredLockActions extends React.Component {

    getPasswordBackRef = React.createRef()
    reactivateRef = React.createRef()
    deleteRef = React.createRef()

    getPasswordBack = () => {
        if (!this.props.lock.plainTextPassword) {
            this.props.openLock(this.props.lock)
        }
        this.getPasswordBackRef.current.show()
    }

    onReactivateClick = () => this.reactivateRef.current.show()
    reactivateLock = timeInSeconds => this.props.activateLock(this.props.lock, timeInSeconds)

    onDeleteClick = () => getLockStatus(this.props.lock) === OPENED ? this.deleteLock() : this.deleteRef.current.show()
    deleteLock = () => this.props.deleteLock(this.props.lock)

    render() {
        return (
            <>
                <LockOpenedModal ref={this.getPasswordBackRef} lock={this.props.lock}/>
                <LockActivateModal ref={this.reactivateRef} lock={this.props.lock} isFirstActivation={false} activateCallback={this.reactivateLock}/>
                <LockDeleteWhenActiveModal ref={this.deleteRef} lock={this.props.lock} deleteCallback={this.deleteLock}/>
                <ButtonGroup size={"sm"}>
                    <Button variant={"success"} onClick={this.getPasswordBack}>Get your password back</Button>
                    <Button variant={"primary"} onClick={this.onReactivateClick}>Activate again</Button>
                    <Button variant={"danger"} onClick={this.onDeleteClick}>Delete</Button>
                </ButtonGroup>
            </>
        );
    }

}

export default connect(null, {openLock, activateLock, deleteLock})(ExpiredLockActions);