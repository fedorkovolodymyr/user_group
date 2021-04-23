import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Modal, Form } from "react-bootstrap";


class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            endpoint: 'http://127.0.0.1:8000/api/group/',
            name: '',
            description: '',
            method: 'POST',
            action: 'http://127.0.0.1:8000/api/group/',
            isOpen: false,
            error: null
        }

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
    }

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    componentDidMount() {
        this.fetchingGroups();
    }

    fetchingGroups() {
        fetch(this.state.endpoint)
            .then(response => response.json())
            .then(result => this.setState({ data: result, isOpen: false }))
            .catch(error => console.log('error', error));
    }

    deleteGroup(id) {
        fetch('http://127.0.0.1:8000/api/group/' + id, { method: 'DELETE' })
            .then(() => this.setState({ date: this.fetchingGroups() }))
            .catch(error => console.log('error', error))
    }

    createGroup() {
        this.setFormValue(null)
        this.openModal();
    }

    updateGroup(group) {
        this.setFormValue(group)
        this.openModal();
    }

    setFormValue(group) {
        console.log('group', group);
        if (group) {
            this.setState({
                name: group.name,
                description: group.description,
                method: 'PUT',
                action: this.state.endpoint + group.id + '/'
            })
        } else {
            this.setState({
                name: "",
                description: "",
                method: 'POST',
                action: this.state.endpoint
            })
        }
    }

    submitForm() {
        fetch(this.state.action, {
            method: this.state.method,
            'Content-Type': 'application/json',
            body: new FormData(document.getElementById("GroupForm"))
        })
            .then(() => this.fetchingGroups())
            .catch(error => console.log('error', error))
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }
    handleChangeDescription(event) {
        this.setState({ description: event.target.value });
    }

    render() {
        return (
            <div>
                <Table hover >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(group => {
                            return <tr key={group.id}>
                                <td>{group.id}</td>
                                <td>{group.name}</td>
                                <td>{group.description}</td>
                                <td>
                                    <Button variant="primary" onClick={this.updateGroup.bind(this, group)}>Edit</Button>
                                    <Button variant="danger" onClick={this.deleteGroup.bind(this, group.id)}>Delete</Button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                <Button variant="success" onClick={this.openModal}>Add Group</Button>
                <Modal show={this.state.isOpen} onHide={this.createGroup}>
                    {/* <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header> */}
                    <Form method={this.state.method} action={this.state.action} id="GroupForm">
                        <Modal.Body>
                            <Form.Group controlId="id_name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleChangeName} placeholder="Enter name" required />
                                <Form.Control.Feedback type="invalid">
                                    {this.state.error}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="id_description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name="description" value={this.state.description} onChange={this.handleChangeDescription} placeholder="Enter description" required />
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
                </Modal>
            </ div >
        );
    }
}

export default GroupList;