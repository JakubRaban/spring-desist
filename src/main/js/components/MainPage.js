import React from 'react';
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import LockTable from "./LockTable"
import LockCreateForm from "./LockCreateForm";
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import {getLocks, whoAmI} from "../redux/actions";
import Button from "react-bootstrap/Button";

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.props.whoAmI()
    }

    render() {
        if (!this.props.isLoggedIn) return <Redirect to={"/login"}/>
        return (
            <>
                <Navbar bg={"light"} expand={"lg"}>
                    <Navbar.Brand>Desist</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id={"basic-navbar-nav"}>
                        <Nav className={"mr-auto"}/>
                        <Nav>
                            {this.props.username && <Nav.Item className={"m-auto"}>Logged in as {this.props.username} ({this.props.email})</Nav.Item>}
                            <Button variant={"outline-secondary"} className={"ml-2"}>Log out</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Container>
                    <Row className={"justify-content-md-center"}>
                        <Col md={12}>
                            <LockTable/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Button onClick={() => this.props.getLocks()} variant={"outline-primary"}>Refresh</Button>
                        </Col>
                    </Row>
                    <Row className={"justify-content-md-center"}>
                        <Col md={8}>
                            <LockCreateForm/>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }

}

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn,
    username: state.user.data.name,
    email: state.user.data.email
})

export default connect(mapStateToProps, {getLocks, whoAmI})(MainPage);