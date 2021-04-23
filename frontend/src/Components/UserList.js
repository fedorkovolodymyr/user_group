import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Modal, Form } from "react-bootstrap";


class UserList extends Component {
    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
        this.state = {
            data: [],
            endpoint: 'http://127.0.0.1:8000/api/user/',
            username: null,
            group: [],
            groupList: [],
            method: 'POST',
            action: 'http://127.0.0.1:8000/api/user/',
            isOpen: false,
            error: null
        }

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangeGroup = this.handleChangeGroup.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    componentDidMount() {
        this.fetchingUsers();
        fetch("http://127.0.0.1:8000/api/group/")
            .then(response => response.json())
            .then(result => this.setState({ groupList: result }))
            .catch(error => console.log('error', error));
    }

    fetchingUsers() {
        fetch(this.state.endpoint)
            .then(response => response.json())
            .then(result => this.setState({ data: result, isOpen: false }))
            .catch(error => console.log('error', error));
    }

    deleteUser(id) {
        fetch('http://127.0.0.1:8000/api/user/' + id, { method: 'DELETE' })
            .then(() => this.fetchingUsers())
            .catch(error => console.log('error', error))
    }

    createUser() {
        this.setState({
            username: null,
            group: [],
            method: 'POST',
            action: this.state.endpoint
        })
        this.openModal();
    }

    updateUser(user) {
        let ids = [];
        user.app_groups.map(g => ids.push(parseInt(g[0])))
        this.setState({
            username: user.username,
            group: ids,
            method: 'PUT',
            action: this.state.endpoint + user.id + '/'
        })
        this.openModal();
    }

    submitForm() {
        fetch(this.state.action, {
            method: this.state.method,
            body: new FormData(document.getElementById("userForm"))
        })
            .then(() => this.fetchingUsers())
            .catch(error => console.log('error', error))
    }


    handleChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    handleChangeGroup(event) {
        let id = parseInt(event.target.value);
        let list = this.state.group
        list.push(id);
        this.setState({ group: list });
    }

    groupList(groups) {
        let result = [];
        groups.map(group => result.push(group[1]))
        return result.join(', ')
    }

    render() {
        return (
            <div ref={this.wrapper}>
                <Table hover >
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Creates</th>
                            <th>Group</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(user => {
                            return <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.date_joined}</td>
                                <td>{this.groupList(user.app_groups)}</td>
                                <td>
                                    <Button variant="primary" onClick={this.updateUser.bind(this, user)}>Edit</Button>
                                    <Button variant="danger" onClick={this.deleteUser.bind(this, user.id)}>Delete</Button>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </Table>
                <Button variant="success" onClick={this.createUser}>Add User</Button>
                <Modal show={this.state.isOpen} onHide={this.closeModal}>
                    <Form method={this.state.method} action={this.state.action} id="userForm">
                        <Modal.Body>
                            <Form.Group controlId="id_username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleChangeUsername} placeholder="Enter username" required />
                                <Form.Control.Feedback type="invalid">
                                    {this.state.error}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="id_group">
                                <Form.Label>Group</Form.Label>
                                <Form.Control as="select" multiple value={this.state.group} onChange={e => this.setState({ group: [].slice.call(e.target.selectedOptions).map(item => item.value) })} name="app_groups" placeholder="Check group" required>
                                    {this.state.groupList.map(group => {
                                        return <option key={group.id} value={group.id} > {group.name}</option>
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.closeModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.submitForm.bind(this)}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal >
            </div >
        );
    }

}
export default UserList;