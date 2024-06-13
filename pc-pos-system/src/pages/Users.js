import { useEffect, useState } from "react";
import axios from 'axios';
import Header from "../component/Header";
import { useAuth } from "./utils/AuthContext";
import '../css/Users.css'
function Users() {

    // authenticate
    const { isAuthenticated, jwtToken } = useAuth();
    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    // get
    const [users, setUsers] = useState(null);
    useEffect(() => {
        axios.get("http://localhost:8080/users", config)
            .then(function (response) {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [isAuthenticated]);
    function getUsers() {
        axios.get("http://localhost:8080/users", config)
            .then(function (response) {
                setUsers(response.data);
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    // end-user

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

    function handleUserName(event) {
        setUserName(event.target.value);
    }
    function handlePassword(event) {
        setPassword(event.target.value);
    }
    function handleEmail(event) {
        setEmail(event.target.value);
    }
    function handleAddress(event) {
        setAddress(event.target.value);
    }
    function handleUserRole(event) {
        setRole(event.target.value);
    }

    //create
    function createUser(event) {
        event.preventDefault();
        const data = {
            username: userName,
            password: password,
            email: email,
            address: address,
            role: role
        }
        axios.post("http://localhost:8080/user", data, config)
            .then(function (response) {
                getUsers();
                // setUserName("");
                // setPassword("");
                // setEmail("");
                // setAddress("");
                // setRole("");
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    //end-create

    //edit
    const [edit, setEdit] = useState(null);
    const [userId, setUserId] = useState(null);
    function updateUser(event) {
        event.preventDefault();
        const data = {
            username: userName,
            password: password,
            email: email,
            address: address,
            role: role
        }
        axios.put("http://localhost:8080/user/" + userId, data, config)
            .then(function (response) {
                getUsers();
                setUsers();
                setUserName("");
                setPassword("");
                setEmail("");
                setAddress("");
                setRole("");
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    // end-edit

    return (
        <div className="users">
            <Header />
            
            <div className="row row-user">
                {/* create */}
                <div className="col-4 form-user">
                    <h1 className="u-h1">Register Users</h1>
                    {
                        !edit &&
                        <form onSubmit={createUser}>
                            <div>
                                <label>User Name</label>
                                <input type="text" class="form-control"  onChange={handleUserName} required />
                            </div>
                            <div>
                                <label>Password</label>
                                <input type="text" class="form-control"  onChange={handlePassword} required />
                            </div>
                            <div>
                                <label>Email</label>
                                <input type="text" class="form-control"  onChange={handleEmail} required />
                            </div>
                            <div>
                                <label>Address</label>
                                <input type="text" class="form-control"  onChange={handleAddress} required />
                            </div>
                            <div>
                                <label>Role</label>
                                <select className="form-select" value={role} onChange={handleUserRole} aria-label="Default select example">
                                    <option selected value="">Open this select menu</option>
                                    <option value="Administrator">Administrator</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Cashier">Cashier</option>
                                    <option value="Technical Support">Technical Support</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-success btn-su">Register</button>
                        </form>
                    }
                    {
                        edit &&
                        <form onSubmit={updateUser}>
                            <div>
                                <div>
                                    <label>User Name</label>
                                    <input type="text" class="form-control" onChange={handleUserName} value={userName} required />
                                </div>
                                <div>
                                    <label>Password</label>
                                    <input type="text" class="form-control" onChange={handlePassword} value={password} required />
                                </div>
                                <div>
                                    <label>Email</label>
                                    <input type="text" class="form-control" onChange={handleEmail} value={email} required />
                                </div>
                                <div>
                                    <label>Address</label>
                                    <input type="text" class="form-control" onChange={handleAddress} value={address} required />
                                </div>
                                <div>
                                    <label>Role</label>
                                    <select className="form-select" value={role} onChange={handleUserRole} aria-label="Default select example">
                                        <option selected value="">Open this select menu</option>
                                        <option value="Administrator">Administrator</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Cashier">Cashier</option>
                                        <option value="Technical Support">Technical Support</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success btn-su">Update</button>
                        </form>
                    }
                    {/* <button type="button" className="btn btn-primary" onClick={getUsers}>Get User</button> */}
                </div>
                {/* end-create */}

                <div className="col-8 table-u">
                    {/* Table */}
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">User Name</th>
                                <th scope="col">Password</th>
                                <th scope="col">Email</th>
                                <th scope="col">Address</th>
                                <th scope="col">Role</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users && users.map((row) => (
                                    <tr>
                                        <th scope="row">{row.id}</th>
                                        <td>{row.username}</td>
                                        <td>{row.password}</td>
                                        <td>{row.email}</td>
                                        <td>{row.address}</td>
                                        <td>{row.role}</td>
                                        <td>
                                            <button type="button" className="btn btn-warning btn-wa" onClick={() => {
                                                setEdit(true);
                                                setUserId(row.id);
                                                setUserName(row.username);
                                                setPassword(row.password);
                                                setEmail(row.email);
                                                setAddress(row.address);
                                                setRole(row.role);
                                            }}>Edit</button>
                                            <button type="button" className="btn btn-danger btn-da" onClick={() => {
                                                axios.delete(`http://localhost:8080/user/${row.id}`, config)
                                                    .then(function (response) {
                                                        getUsers();
                                                        console.log(response);
                                                    })
                                                    .catch(function (error) {
                                                        console.log(error);
                                                    })
                                            }}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {/* End-Table */}
                </div>
            </div>
        </div>
    )
}
export default Users;