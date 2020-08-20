
import React from 'react'
import * as LockStatus from '../LockStatus'
import CreatedLockActions from "./CreatedLockActions";
import ActiveLockActions from "./ActiveLockActions";
import ExpiredLockActions from "./ExpiredLockActions";
import {getLockStatus, lockStatusToMessage} from "../LockStatus";

class LockTableRow extends React.Component {

    render() {
        const lock = this.props.lock;
        const lockStatus = getLockStatus(lock)
        let userActions;
        if (lockStatus === LockStatus.CREATED) {
            userActions = <CreatedLockActions lock={lock}/>
        } else if (lockStatus === LockStatus.ACTIVE) {
            userActions = <ActiveLockActions lock={lock} />
        } else {
            userActions = <ExpiredLockActions lock={lock} />
        }

        return (
            <tr>
                <td><strong>{lock.name}</strong></td>
                <td>{lockStatusToMessage[lockStatus]}</td>
                <td>{lock.timeCreated.toLocaleString()}</td>
                <td>{lock.expirationTime ? lock.expirationTime.toLocaleString() : ''}</td>
                <td>{userActions}</td>
            </tr>
        );
    }

}

export default LockTableRow;