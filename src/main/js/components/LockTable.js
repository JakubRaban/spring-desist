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
                {this.props.locks.length > 0 ?
                    this.props.locks.map(lock => <LockTableRow key={lock.id} lock={lock}/>) :
                    <tr>
                        <td colSpan={"5"} style={{textAlign: "center", backgroundColor: "#cdcdcd"}}>
                            <h5>No locks created yet. Create first one below</h5>
                        </td>
                    </tr>
                }
                </tbody>
            </Table>
        )
    }
}

const mapStateToProps = state => ({
    locks: state.locks
})

export default connect(mapStateToProps, {getLocks})(LockTable);
