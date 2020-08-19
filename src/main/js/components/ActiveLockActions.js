
import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

class ActiveLockActions extends React.Component {
    render() {
        return (
            <ButtonGroup size={"sm"}>
                <Button variant={"primary"}>Extend</Button>
                <Button variant={"danger"}>Delete</Button>
            </ButtonGroup>
        )
    }
}

export default ActiveLockActions;