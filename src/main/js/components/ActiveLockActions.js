import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import LockActivateOrExtendModal from "./LockActivateModal";
import {connect} from 'react-redux'
import {activateLock, deleteLock} from "../redux/actions";
import LockDeleteWhenActiveModal from "./LockDeleteWhenActiveModal";

class ActiveLockActions extends React.Component {

    extendModalRef = React.createRef()
    deleteModelRef = React.createRef()

    onExtendClick = () => this.extendModalRef.current.show()
    onDeleteClick = () => this.deleteModelRef.current.show()
    onExtendLock = timeInSeconds => this.props.activateLock(this.props.lock, timeInSeconds);
    onDeleteLock = () => this.props.deleteLock(this.props.lock)

    render() {
        return (
            <>
                <LockActivateOrExtendModal lock={this.props.lock} ref={this.extendModalRef}
                                           activateCallback={this.onExtendLock} isFirstActivation={false}/>
                <LockDeleteWhenActiveModal lock={this.props.lock} deleteCallback={this.onDeleteLock}
                                           ref={this.deleteModelRef}/>
                <ButtonGroup size={"sm"}>
                    <Button variant={"primary"} onClick={this.onExtendClick}>Extend</Button>
                    <Button variant={"danger"} onClick={this.onDeleteClick}>Delete</Button>
                </ButtonGroup>
            </>
        )
    }
}

export default connect(null, {activateLock, deleteLock})(ActiveLockActions);