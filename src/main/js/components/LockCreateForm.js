import React from "react";
import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button'
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from 'react-bootstrap/FormControl'
import {connect} from 'react-redux'
import {createLock} from "../redux/actions";
import randomPasswordGenerator from "../randomPasswordGenerator";
import LockCreateConfirmationModal from "./LockCreateConfirmationModal";

class LockCreateForm extends React.Component {

    initialState = {lockName: '', password: ''};
    state = {...this.initialState};
    modalElement = React.createRef();

    onSubmit = e => {
        e.preventDefault();
        this.props.createLock(this.state.lockName, this.state.password);
        this.setState({...this.initialState});
        this.modalElement.current.showWithData(this.state.lockName, this.state.password);
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

    onGenerateRandomly = () => {
        this.setState({password: randomPasswordGenerator(16)});
    }

    render() {
        const {lockName, password} = this.state;
        return (
            <>
                <LockCreateConfirmationModal ref={this.modalElement}/>
                <div className={"border p-4"}>
                    <Form>
                        <Form.Group controlId={"lockCreateFormName"}>
                            <Form.Label>Lock name</Form.Label>
                            <Form.Control type={"text"} placeholder={"Enter lock name"} name={"lockName"}
                                          value={lockName}
                                          onChange={this.onChange}/>
                        </Form.Group>
                        <Form.Group controlId={"lockCreateFormPassword"}>
                            <Form.Label>Password</Form.Label>
                            <InputGroup className={"mb-3"}>
                                <FormControl type={"password"} placeholder={"Enter password"} name={"password"}
                                             value={password} onChange={this.onChange}/>
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

export default connect(null, {createLock})(LockCreateForm);