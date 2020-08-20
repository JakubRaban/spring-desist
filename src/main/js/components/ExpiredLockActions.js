
import React from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

class ExpiredLockActions extends React.Component {

    render() {
        return (
            <ButtonGroup size={"sm"}>
                <Button variant={"success"}>Get your password back</Button>
                <Button variant={"primary"}>Activate again</Button>
                <Button variant={"danger"}>Delete</Button>
            </ButtonGroup>
        );
    }

}

export default ExpiredLockActions;