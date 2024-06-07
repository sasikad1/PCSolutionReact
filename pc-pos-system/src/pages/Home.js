import Header from "../component/Header";
import { Link } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";
import '../css/Home.css'

export default function Home() {
    const { isAuthenticated, logout } = useAuth();
    return (
        <div className="text-center">
            <Header />
            <div >
                <h1 className="display-5">Home Page</h1>
            </div>

            <Link to="../item" className="text-decoration-none">Item</Link><br />
            <Link to="../itemcategory" className="text-decoration-none">Item Category</Link><br />
            <Link to="../stock" className="text-decoration-none">Stock</Link><br />
            <Link to="../users" className="text-decoration-none">Users</Link><br />
            <Link to="../login" className="text-decoration-none">Login</Link><br />
            <Link to="../order" className="text-decoration-none">Order</Link><br />

            {
                isAuthenticated &&
                <button type="button" className="btn btn-danger" onClick={logout}>Logout</button>
            }

        </div>
    )
}