import React from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import LockCreateConfirmationModal from "./LockCreateConfirmationModal";
import LockDeleteWhenActiveModal from "./LockDeleteWhenActiveModal";
import LockActivateModal from "./LockActivateModal";
import {connect} from 'react-redux'
import {openLock} from "../redux/actions";

class ExpiredLockActions extends React.Component {

    getPasswordBackRef = React.createRef()

    getPasswordBack = () => {
        if (!this.props.lock.plainTextPassword) {
            this.props.openLock(this.props.lock)
        }
        this.getPasswordBackRef.current.showWithData(this.props.lock.name, this.props.lock.plainTextPassword)
    }

    render() {
        return (
            <>
                <LockCreateConfirmationModal ref={this.getPasswordBackRef} isOpening={true}/>
                {/*<LockActivateModal />*/}
                {/*<LockDeleteWhenActiveModal />*/}
                <ButtonGroup size={"sm"}>
                    <Button variant={"success"} onClick={this.getPasswordBack}>Get your password back</Button>
                    <Button variant={"primary"}>Activate again</Button>
                    <Button variant={"danger"}>Delete</Button>
                </ButtonGroup>
            </>
        );
    }

}

export default connect(null, {openLock})(ExpiredLockActions);