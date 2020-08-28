import React from 'react';
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'
import LockTable from "./LockTable"
import LockCreateForm from "./LockCreateForm";
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import {getLocks} from "../redux/actions";
import Button from "react-bootstrap/Button";

class MainPage extends React.Component {

    render() {
        if (!this.props.isLoggedIn) return <Redirect to={"/login"} />
        return (
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
        )
    }

}

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn
})

export default connect(mapStateToProps, {getLocks})(MainPage);