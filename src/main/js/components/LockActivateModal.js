
import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class LockActivateModal extends React.Component {

    state = {
        isShown: false,
        amount: '',
        unit: ''
    }

    show = () => this.setState({isShown: true})

    onChange = e => this.setState({[e.target.name]: e.target.value})

    onClose = () => this.setState({isShown: false})

    onActivate = () => {
        this.props.activateCallback(this.calculateDurationInSeconds())
        this.onClose()
    }

    calculateDurationInSeconds = () => {
        const amount = Number(this.state.amount)
        switch (this.state.unit) {
            case "minutes":
                return amount * 60;
            case "hours":
                return amount * 60 * 60;
            case "days":
                return amount * 60 * 60 * 24;
        }
    }

    render() {
        const [amount, unit] = [this.state.amount, this.state.unit]
        return (
            <Modal show={this.state.isShown} onHide={this.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Activate lock</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Choose the duration you want to activate {this.props.lock.name} lock for:</p>
                    <Form inline>
                        <Form.Control placeholder={"45"} type={"text"} name={"amount"} value={amount} onChange={this.onChange}/>
                        <Form.Control as={"select"} value={unit} name={"unit"} onChange={this.onChange}>
                            <option>minutes</option>
                            <option>hours</option>
                            <option>days</option>
                        </Form.Control>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={this.onClose}>Cancel</Button>
                    <Button variant={"primary"} onClick={this.onActivate}>Activate</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default LockActivateModal;