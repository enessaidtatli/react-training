import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserConsumer from '../context'
import axios from 'axios'
import { Link } from 'react-router-dom'


class User extends Component {
    state = {
        isVisible: false
    }
    static defaultProps = {
        name: "Bilgi Yok",
        departman: "Bilgi Yok",
        salary: "Bilgi Yok"
    }


    onClickEvent = (event) => {
        this.setState({
            isVisible: !this.state.isVisible
        });
    }

    onDeleteUser = async (dispatch, e) => {
        const { id } = this.props;
        //delete request
        await axios.delete(`http://localhost:3004/users/${id}`)
        dispatch({ type: "DELETE_USER", payload: id });
    }

    render() {
        const { id, name, departman, salary } = this.props;
        const { isVisible } = this.state;
        return (
            <UserConsumer>
                {
                    value => {
                        const { dispatch } = value;
                        return (
                            <div className="col-md-8 mb-4">
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between">
                                        <h4 className="d-inline"
                                            onClick={this.onClickEvent}
                                            style={{ cursor: "pointer" }}>{name}</h4>

                                        <i className="far fa-trash-alt"
                                            style={{ cursor: "pointer" }}
                                            onClick={this.onDeleteUser.bind(this, dispatch)}>
                                        </i>
                                    </div>
                                    {
                                        isVisible
                                            ?
                                            <div className="card-body" style={isVisible ? { backgroundColor: "#d48888", color: "white" } : null}>
                                                <p className="card-text">Departman: {departman}</p>
                                                <p className="card-text">Salary: {salary}</p>
                                                <Link to={`edit/${id}`} className="btn btn-dark btn-block">Update User</Link>
                                            </div>
                                            : null
                                    }

                                </div>
                            </div>
                        )
                    }
                }
            </UserConsumer>
        )
    }
}

User.propTypes = {
    name: PropTypes.string.isRequired,
    departman: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

// User.defaultProps = {
//     name: "Bilgi Yok",
//     departman: "Bilgi Yok",
//     salary: "Bilgi Yok"
// }
export default User;