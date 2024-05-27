import Header from "../component/Header";
import { Link } from "react-router-dom";

export default function Home(){
    return(
        <>
        <Header/>
        <h1>Home Page</h1>
        <Link to="item">Item</Link><br/>
        <Link to="itemcategory">Item Category</Link><br/>
        <Link to="stock">Stock</Link><br/>
        <Link to="users">Users</Link><br/>
        <Link to="login">Login</Link><br/>
        <Link to="order">Order</Link><br/>
        </>
    )
}