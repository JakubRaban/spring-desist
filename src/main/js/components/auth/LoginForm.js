import React from 'react'
import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {connect} from 'react-redux';
import {login} from "../../redux/actions";
import {Redirect, Link} from 'react-router-dom'
import Alert from "react-bootstrap/Alert";
import * as OperationPhase from "../../OperationPhase"

class LoginForm extends React.Component {

    state = {email: '', password: ''}

    onSubmit = e => {
        e.preventDefault();
        this.setState({showLoginFailedAlert: true})
        this.props.login(this.state.email, this.state.password);
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})

    render() {
        if (this.props.user.isLoggedIn) {
            return <Redirect to={"/"} />
        }
        const {email, password} = this.state;
        return (
            <Container>
                <Row className={"justify-content-center"}>
                    <Col md={"8"}>
                        <div className={"border p-3 m-2"}>
                            <h3>Login into Desist</h3>
                            <Alert variant={"danger"} show={this.props.loginPhase === OperationPhase.FAIL}>
                                Login failed. Please make sure your account is active and your credentials are correct.
                            </Alert>
                            <Form>
                                <Form.Group controlId={"loginFormEmail"}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type={"email"} placeholder={"john.doe@example.com"} name={"email"}
                                                  value={email}
                                                  onChange={this.onChange}/>
                                </Form.Group>
                                <Form.Group controlId={"loginFormPassword"}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type={"password"} name={"password"} placeholder={"(hidden)"}
                                                  value={password} onChange={this.onChange}/>
                                </Form.Group>
                                <Button variant={"primary"} type={"submit"} onClick={this.onSubmit} disabled={this.props.loginPhase === OperationPhase.INIT}>
                                    {this.props.loginPhase === OperationPhase.INIT ? "Logging in..." : "Submit"}
                                </Button>
                            </Form>
                            <div className={"pt-3"}>New to Desist? <Link to={"/register"}>Create an account</Link></div>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

}

const mapStateToProps = state => ({
    user: state.user,
    loginPhase: state.loginPhase
})

export default connect(mapStateToProps, {login})(LoginForm);