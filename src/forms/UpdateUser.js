import React, { Component } from 'react'
import UserConsumer from '../context'
import axios from 'axios';


class UpdateUser extends Component {
    state = {
        name: "",
        departman: "",
        salary: "",
        error: false
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const response = await axios.get(`http://localhost:3004/users/${id}`);
        const { name, salary, departman } = response.data;
        this.setState({
            name,
            salary,
            departman
        })
    }

    updateUser = async (dispatch, e) => {
        e.preventDefault();
        const { name, salary, departman } = this.state;
        const { id } = this.props.match.params;
        const updatedUser = {
            name,
            salary,
            departman
        }

        if (!this.validateForm()) {
            this.setState({
                error: true
            });
            return;
        }
        const response = await axios.put(`http://localhost:3004/users/${id}`, updatedUser);
        dispatch({ type: "UPDATE_USER", payload: response.data });
        this.props.history.push("/");
    }

    validateForm = () => {
        const { name, salary, departman } = this.state;
        if (name === "" || salary === "" || departman === "") {
            return false;
        }
        return true;
    }

    render() {
        const { error, name, salary, departman } = this.state;
        return (
            <UserConsumer>
                {
                    value => {
                        const { dispatch } = value;
                        return (
                            <div className="col-md-8 mb-4">
                                <div className="card">
                                    <div className="card-header" style={{ backgroundColor: "#d1e0e0" }}>
                                        <h4>Update User Form</h4>
                                    </div>
                                    <div className="card-body">
                                        {
                                            error ?
                                                <div className="alert alert-danger">
                                                    Lütfen bilgilerinizi kontrol ediniz
                                        </div> :
                                                null
                                        }
                                        <form onSubmit={this.updateUser.bind(this, dispatch)}>
                                            <div className="form-group">
                                                <label htmlFor="name">Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    placeholder="Enter Name"
                                                    autoComplete = "off"
                                                    className="form-control"
                                                    value={name}
                                                    onChange={this.changeInput}>
                                                </input>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="salary">Salary</label>
                                                <input
                                                    type="text"
                                                    name="salary"
                                                    id="salary"
                                                    placeholder="Enter Salary"
                                                    autoComplete = "off"
                                                    className="form-control"
                                                    value={salary}
                                                    onChange={this.changeInput}>
                                                </input>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="departman">Departman</label>
                                                <input
                                                    type="text"
                                                    name="departman"
                                                    id="departman"
                                                    placeholder="Enter Departman"
                                                    className="form-control"
                                                    autoComplete = "off"
                                                    value={departman}
                                                    onChange={this.changeInput}>
                                                </input>
                                            </div>
                                            <button className="btn btn-danger btn-block" type="submit">Update User</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
            </UserConsumer>
        )
    }
}
export default UpdateUser;