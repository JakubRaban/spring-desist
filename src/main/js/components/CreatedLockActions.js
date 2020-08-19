import React from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import LockActivateModal from "./LockActivateModal";
import {connect} from 'react-redux'
import {activateLock, deleteLock} from "../redux/actions";

class CreatedLockActions extends React.Component {

    activateModalRef = React.createRef()

    onActivateClick = () => this.activateModalRef.current.show();
    onCopyToClipboardClick = () => navigator.clipboard.writeText(this.props.lock.plainTextPassword)
    onDeleteClick = () => this.props.deleteLock(this.props.lock);
    onActivateLock = timeInSeconds => this.props.activateLock(this.props.lock, timeInSeconds);

    render() {
        return (
            <>
                <LockActivateModal lock={this.props.lock} ref={this.activateModalRef}
                                   activateCallback={this.onActivateLock} isFirstActivation={true}/>
                <ButtonGroup size={"sm"}>
                    <Button variant={"success"} onClick={this.onActivateClick}>Activate</Button>
                    {this.props.lock.plainTextPassword && <Button variant={"secondary"} onClick={this.onCopyToClipboardClick}>Copy to clipboard</Button>}
                    <Button variant={"danger"} onClick={this.onDeleteClick}>Delete</Button>
                </ButtonGroup>
            </>
        )
    }

}

export default connect(null, {activateLock, deleteLock})(CreatedLockActions);