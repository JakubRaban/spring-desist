
import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from 'react-bootstrap/FormControl'

class LockCreateConfirmationModal extends React.Component {

    state = {
        isShown: false
    }

    onCopyClick = () => {navigator.clipboard.writeText(this.state.password)}

    showWithData = (lockName, password) => {
        this.setState({lockName, password, isShown: true})
    }

    close = () => this.setState({isShown: false})

    render() {
        return (
            <Modal show={this.state.isShown} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Lock created</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Lock was successfully created. Copy this:</p>
                    <InputGroup>
                        <FormControl readonly type={"password"} value={this.state.password} />
                        <InputGroup.Append>
                            <Button variant={"outline-secondary"} onClick={this.onCopyClick}>Copy</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    <p>and set it as your <strong>{this.state.lockName}</strong> password.</p>
                    <p>Click on "Activate" when you're done.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"primary"} onClick={this.close}>Done</Button>
                </Modal.Footer>
            </Modal>
        )
    }

}

export default LockCreateConfirmationModal;