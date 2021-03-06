import React from "react";
import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button'
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from 'react-bootstrap/FormControl'
import {connect} from 'react-redux'
import {createLock} from "../redux/actions";
import generateRandomPassword from "../randomPasswordGenerator";
import LockCreateConfirmationModal from "./LockCreateConfirmationModal";
import Alert from "react-bootstrap/Alert";
import {FAIL, SUCCESS} from "../OperationPhase";

class LockCreateForm extends React.Component {

    initialState = {lockName: '', password: ''};
    state = {...this.initialState};
    modalElement = React.createRef();

    onSubmit = e => {
        e.preventDefault();
        this.props.createLock(this.state.lockName, this.state.password);
        this.modalElement.current.show();
    }

    resetState = () => this.setState({...this.initialState})
    onChange = e => this.setState({[e.target.name]: e.target.value});

    onGenerateRandomly = () => {
        this.setState({password: generateRandomPassword(16)});
    }

    render() {
        const {lockName, password} = this.state;
        return (
            <>
                <LockCreateConfirmationModal ref={this.modalElement} lockName={this.state.lockName}
                                             success={this.props.lockCreate.phase === SUCCESS}
                                             password={this.state.password} resetInput={this.resetState}/>
                <div className={"border p-3"}>
                    <h3>Create new lock</h3>
                    <Alert variant={"danger"} show={this.props.lockCreate.phase === FAIL}>
                        {`Error: ${this.props.lockCreate.error}`}
                    </Alert>
                    <Form>
                        <Form.Group controlId={"lockCreateFormName"}>
                            <Form.Label>Lock name</Form.Label>
                            <Form.Control type={"text"} placeholder={"e.g. Facebook, Twitter, Instagram etc."}
                                          name={"lockName"}
                                          value={lockName}
                                          onChange={this.onChange}/>
                        </Form.Group>
                        <Form.Group controlId={"lockCreateFormPassword"}>
                            <Form.Label>Password</Form.Label>
                            <InputGroup className={"mb-3"}>
                                <FormControl type={"password"} placeholder={"Enter any password you won't remember"}
                                             name={"password"} value={password} onChange={this.onChange}/>
                                <InputGroup.Append>
                                    <Button variant={"outline-secondary"} onClick={this.onGenerateRandomly}>Generate
                                        randomly</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                        <Button variant={"primary"} type={"submit"} onClick={this.onSubmit}>Submit</Button>
                    </Form>
                </div>
            </>
        );
    }

}

const mapDispatchToProps = state => ({
    lockCreate: state.actions.lockCreate
})

export default connect(mapDispatchToProps, {createLock})(LockCreateForm);