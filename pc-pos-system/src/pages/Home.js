import Header from "../component/Header";
import { Link } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";

export default function Home(){
    const {isAuthenticated, logout} = useAuth();
    return(
        <div>
        <Header/>
        <h1>Home Page</h1>
        <Link to="item">Item</Link><br/>
        <Link to="itemcategory">Item Category</Link><br/>
        <Link to="stock">Stock</Link><br/>
        <Link to="users">Users</Link><br/>
        <Link to="login">Login</Link><br/>
        <Link to="order">Order</Link><br/>
        
        {
            isAuthenticated &&
                <button type="button" className="btn btn-danger" onClick={logout}>Logout</button>
        }

        </div>
    )
}