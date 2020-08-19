
import React from 'react'
import * as LockStatus from '../LockStatus'
import CreatedLockActions from "./CreatedLockActions";
import ActiveLockActions from "./ActiveLockActions";

class LockTableRow extends React.Component {

    render() {
        const lock = this.props.lock;
        let userActions;
        if (lock.status === LockStatus.CREATED) {
            userActions = <CreatedLockActions lock={lock}/>
        } else if (lock.status === LockStatus.ACTIVE) {
            userActions = <ActiveLockActions lock={lock} />
        }
        return (
            <tr>
                <td><strong>{lock.name}</strong></td>
                <td>{LockStatus.getMessage(lock)}</td>
                <td>{lock.timeCreated.toLocaleString()}</td>
                <td>{lock.expirationTime ? lock.expirationTime.toLocaleString() : ''}</td>
                <td>{userActions}</td>
            </tr>
        );
    }

}

export default LockTableRow;