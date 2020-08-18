import React from 'react'
import Table from 'react-bootstrap/Table'
import {connect} from 'react-redux'
import LockTableRow from "./LockTableRow";
import {getLocks} from "../redux/actions";

class LockTable extends React.Component {

    constructor(props) {
        super(props);
        props.getLocks();
    }

    render() {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Lock name</th>
                        <th>Status</th>
                        <th>Created at</th>
                        <th>Active until</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.locks.map(lock => (
                    <LockTableRow key={lock.id} lock={lock} />
                ))}
                </tbody>
            </Table>
        )
    }

}

const mapStateToProps = state => ({
    locks: state.locks
})

export default connect(mapStateToProps, {getLocks})(LockTable)
