import { useEffect, useState } from "react";
import axios from 'axios';
import Header from "../component/Header";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./utils/AuthContext";
import '../css/Order.css';

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
    }
    //end-get

    // create(not pass data)
    function createOrder(event) {
        event.preventDefault();
        axios.post("http://localhost:8080/order", config)
            .then(function (response) {
                getOrders();
                console.log(response);
                navigate(`/ocd pc-pos-systemrders/${response.data.id}/editOrder`);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    // end-create ${row.id}

    function getInvoice() {
        axios.post(`http://localhost:8080/auth/invoice/generate/user/57/order/5`, config)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    return (
        <div className="Order">
            <Header />


            <div className="row">
                <div className="row row-sub">
                    <div className="col-6">
                        <h1 className="display-5">Orders</h1>
                    </div>
                    <div className="col-6">
                        <button type="button" onClick={createOrder} className="btn btn-primary">Create Order</button>
                    </div>
                </div>


                <div className="col-11 tb">
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
                                                row.completed ? <button type="button" className="btn btn-success order-status" onClick={() => {
                                                    axios.post("http://localhost:8080/invoice/generate/user/57/order/11", config)
                                                        .then(function (response) {
                                                            console.log(response);
                                                        })
                                                        .catch(function (error) {
                                                            console.log(error);
                                                        })
                                                }}> Get Invoice</button> : <button type="button" className="btn btn-warning order-status" onClick={() => {
                                                    navigate(`/orders/${row.id}/editOrder`)
                                                }}>Add or Edit Item</button>
                                            }
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