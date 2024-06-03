import { useEffect, useState } from "react";
import axios from 'axios';
import Header from "../component/Header";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./utils/AuthContext";

function Order() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState(null);

    // Authentication
    const { isAuthenticated, jwtToken } = useAuth();
    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    //get
    useEffect(() => {
        if (isAuthenticated) {
            axios.get("http://localhost:8080/orders", config)
                .then(function (response) {
                    setOrders(response.data);
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }, [isAuthenticated])

    function getOrders() {
        axios.get("http://localhost:8080/orders", config)
            .then(function (response) {
                setOrders(response.data);
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    //end-get

    // create(not pass data)
    function createOrder() {
        axios.post(`http://localhost:8080/auth/order`, config)
            .then(function (response) {
                getOrders();
                console.log(response);
                navigate(`/orders/${response.data.id}/editOrder`);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    // end-create
    return (
        <div className="Order">
            <Header />
            <div className="text-center">
                <h1 className="display-5">Orders</h1>
            </div>
            
            <div className="row">
                <button type="button" onClick={createOrder} className="btn btn-primary">Create Order</button>
                <div className="col-11">
                    <table className="table">
                        <thead className="thead-light">
                            <tr className="">
                                <th scope="col">#</th>
                                <th scope="col">Total Price</th>
                                <th scope="col">Order Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders && orders.map((row) => (
                                    <tr>
                                        <th scope="row">{row.id}</th>
                                        <td>{row.totalPrice}</td>
                                        <td>{row.orderDate}</td>
                                        <td>{row.completed ? "completed" : "incomplete"}</td>
                                        <td>
                                            {
                                                row.completed ? <button type="button" className="btn btn-success"> Completed Process</button> : <button type="button" className="btn btn-warning" onClick={() => {
                                                    navigate(`/orders/${row.id}/editOrder`)
                                                }}>Add or Edit Item</button>}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Order;