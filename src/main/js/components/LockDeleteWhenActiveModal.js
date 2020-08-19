import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {ACTIVE} from "../LockStatus";

class LockDeleteWhenActiveModal extends React.Component {

    state = {
        isShown: false
    }

    show = () => this.setState({isShown: true})
    onClose = () => this.setState({isShown: false})
    onDelete = () => {
        this.props.deleteCallback()
        this.onClose()
    }

    render() {
        // TODO przenieść logikę sprawdzania statusu locka do nowej metody która uwzględni czy termin ważności upłynął
        const userActionExplanation = this.props.lock.status === ACTIVE ? "is yet to expire" : "you haven't opened yet"
        return (
            <Modal show={this.state.isShown} onHide={this.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You're trying to delete a lock which {userActionExplanation}. If you proceed, your password will be lost forever.
                    Would you like to delete the lock anyway?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={this.onClose}>Cancel</Button>
                    <Button variant={"danger"} onClick={this.onDelete}>Delete anyway</Button>
                </Modal.Footer>
            </Modal>
        )
    }

}

export default LockDeleteWhenActiveModal;