import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form"
import {connect} from "react-redux"
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {register} from "../../redux/actions";
import {Redirect} from 'react-router-dom'

class RegistrationForm extends React.Component {

    state = {
        fullName: '',
        email: '',
        password: '',
        confirmedPassword: ''
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})
    onSubmit = e => {
        e.preventDefault()
        if (this.state.password === this.state.confirmedPassword) {
            this.props.register(this.state.fullName, this.state.email, this.state.password)
        }
    }

    render() {
        if (this.props.user.isLoggedIn) return <Redirect to={"/"}/>
        const {fullName, email, password, confirmedPassword} = this.state
        return (
            <Container>
                <Row className={"justify-content-center"}>
                    <Col md={"8"}>
                        <div className={"border p-3 m-2"}>
                            <h3>Register</h3>
                            <Alert variant={"success"} show={this.props.registrationSuccessful}>
                                Registration successful. Check your email account and confirm registration.
                            </Alert>
                            {!this.props.registrationSuccessful &&
                            <Form>
                                <Form.Group controlId={"registrationFormFullName"}>
                                    <Form.Label>Your full name</Form.Label>
                                    <Form.Control type={"text"} placeholder={"John Doe"} name={"fullName"}
                                                  value={fullName}
                                                  onChange={this.onChange}/>
                                </Form.Group>
                                <Form.Group controlId={"registrationFormEmail"}>
                                    <Form.Label>Your email</Form.Label>
                                    <Form.Control type={"text"} placeholder={"johh.doe@example.com"} name={"email"}
                                                  value={email}
                                                  onChange={this.onChange}/>
                                </Form.Group>
                                <Form.Group controlId={"registrationFormPassword"}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type={"password"} placeholder={"(hidden)"} name={"password"}
                                                  value={password}
                                                  onChange={this.onChange}/>
                                </Form.Group>
                                <Form.Group controlId={"registrationFormConfirmPassword"}>
                                    <Form.Label>Retype your password</Form.Label>
                                    <Form.Control type={"password"} placeholder={"(hidden)"} name={"confirmedPassword"}
                                                  value={confirmedPassword}
                                                  onChange={this.onChange}/>
                                </Form.Group>
                                <Button variant={"primary"} type={"submit"} onClick={this.onSubmit}
                                        disabled={this.props.registrationInitialized}>
                                    {this.props.registrationInitialized ? "Loading..." : "Submit"}
                                </Button>
                            </Form>}
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }

}

const mapStateToProps = state => ({
    user: state.user,
    registrationSuccessful: state.registrationSuccessful,
    registrationInitialized: state.registrationInitialized
})

export default connect(mapStateToProps, {register})(RegistrationForm);