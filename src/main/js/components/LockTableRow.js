
import React from 'react'

class LockTableRow extends React.Component {

    render() {
        const lock = this.props.lock;

        return (
            <tr>
                <td>{lock.name}</td>
                <td>{lock.status}</td>
                <td>{lock.timeCreated}</td>
                <td>{lock.expirationTime}</td>
                <td/>
            </tr>
        );
    }

}

export default LockTableRow;