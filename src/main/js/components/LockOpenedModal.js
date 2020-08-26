import React from "react";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";

class LockOpenedModal extends React.Component {

    state = {
        isShown: false
    }

    show = () => this.setState({isShown: true})
    close = () => this.setState({isShown: false})
    onCopyClick = () => navigator.clipboard.writeText(this.props.lock.plainTextPassword)

    render() {
        let lock = this.props.locks.find(lock => lock.id === this.props.lock.id)
        let plainTextPassword = lock.plainTextPassword
        return (
            <Modal show={this.state.isShown} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Lock opened</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Here is your <strong>{lock.name}</strong> password:</p>
                    <InputGroup>
                        <FormControl readOnly type={"password"}
                                     value={plainTextPassword ? plainTextPassword : "Loading..."}/>
                        <InputGroup.Append>
                            <Button variant={"outline-secondary"} onClick={this.onCopyClick}
                                    disabled={!plainTextPassword}>Copy to clipboard</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"primary"} onClick={this.close}>Done</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

const mapStateToProps = state => ({
    locks: state.locks
})

export default connect(mapStateToProps, null, null, {forwardRef: true})(LockOpenedModal);