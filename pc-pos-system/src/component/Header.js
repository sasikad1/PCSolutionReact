import { Link } from "react-router-dom";
import { useAuth } from "../pages/utils/AuthContext";

export default function Header(){
    const {isAuthenticated, logout} = useAuth();
    
    return(
        <div className="Navheder">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">PC Solution</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#"><Link to="item">Item</Link><br/></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"><Link to="itemcategory">Item Category</Link><br/></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"><Link to="stock">Stock</Link><br/></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"><Link to="order">Order</Link><br/></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"><Link to="users">Users</Link><br/></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"><Link to="login">Login</Link><br/></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </li>
                    {
            isAuthenticated &&
                <button type="button" className="btn btn-danger" onClick={logout}>Logout</button>
        }
                </ul>
            </div>
        </nav>
    </div>
    )
}