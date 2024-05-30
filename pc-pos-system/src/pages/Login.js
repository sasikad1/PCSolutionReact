import { useState } from "react";
import axios from 'axios';
import Header from "../component/Header";
import { useAuth } from "./utils/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const {login} =useAuth();
    const navigate = useNavigate();

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) =>{
        e.preventDefault();

        const data = {
            username: username,
            password: password
        };

        axios.post("http://localhost:8080/auth/login",data)
        .then(function(response){
            login(response.data);
            console.log(response.data);
            navigate("/");
        })
        .catch(function(response){
            console.log(response.data);
        })
    }

    return (
        <div className="login text-center">
            <Header />
                <h1 className="display-5">Login Page</h1>
            <form onSubmit={handleLogin} className="m-5">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e)=>{
                        setUserName(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"  onChange={(e)=>{
                        setPassword(e.target.value);
                    }} />
                </div>
                <button type="submit" className="btn btn-primary m-4">Submit</button>
            </form>
        </div>
    )
}