import React, { Component } from 'react'
import posed from 'react-pose'
import UserConsumer from '../context'
import axios from 'axios';


const Animation = posed.div({
    visible: {
        opacity: 1,
        applyAtStart: {
            display: "block"
        }
    },
    hidden: {
        opacity: 0,
        applyAtEnd: {

            display: "none"
        }
    }
});


class AddUser extends Component {
    state = {
        visible: true,
        error: false,
        name: "",
        departman: "",
        salary: ""
    }

    changeVisibility = (e) => {
        this.setState({
            visible: !this.state.visible
        })
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    addUser = async (dispatch, e) => {
        e.preventDefault();
        const { name, departman, salary} = this.state;
        const newUser = {
            name,
            departman,
            salary
        }

        if(!this.valideForm()){
            this.setState({
                error: true
            });
            return;
        }

        const response = await axios.post("http://localhost:3004/users", newUser);
        dispatch({type: "ADD_USER", payload: response.data});
        //redirect
        this.props.history.push("/");
    }

    valideForm = () =>{
        const { name, salary, departman } = this.state;
        if( name === "" || salary === "" || departman === ""){
            return false;
        }
        return true;
    }

    render() {
        const { error, visible, name, salary, departman } = this.state;
        return (
        <UserConsumer>
            {
                value => {
                    const { dispatch } = value;
                    return (
                        <div className="col-md-8 mb-4">
                            <button onClick={this.changeVisibility} className="btn btn-dark btn-block mb-2">
                                {visible ? "Hide Form" : "Show Form"}
                            </button>
                            <Animation pose = { visible ? "visible" : "hidden"}>
                            <div className="card">
                                <div className="card-header" style={{ backgroundColor: "#d1e0e0" }}>
                                    <h4>Add User Form</h4>
                                </div>
                                <div className="card-body">
                                    {
                                        error ? 
                                        <div className = "alert alert-danger">
                                            Lütfen bilgilerinizi kontrol ediniz
                                        </div> :
                                        null
                                    }
                                    <form onSubmit = {this.addUser.bind(this, dispatch)}>
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                autoComplete = "off"
                                                id="name"
                                                placeholder="Enter Name"
                                                className="form-control"
                                                value={name}
                                                onChange = {this.changeInput}>
                                            </input>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Salary</label>
                                            <input
                                                type="text"
                                                name="salary"
                                                id="salary"
                                                autoComplete = "off"
                                                placeholder="Enter Salary"
                                                className="form-control"
                                                value={salary}
                                                onChange = {this.changeInput}>
                                            </input>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Departman</label>
                                            <input
                                                type="text"
                                                name="departman"
                                                id="departman"
                                                placeholder="Enter Departman"
                                                autoComplete = "off"
                                                className="form-control"
                                                value={departman}
                                                onChange = {this.changeInput}>
                                            </input>
                                        </div>
                                        <button className="btn btn-danger btn-block" type="submit">Add User</button>
                                    </form>
                                </div>
                            </div>
                            </Animation>
                        </div>
                    )
                }
            }
        </UserConsumer>
        )
    }
}
export default AddUser;