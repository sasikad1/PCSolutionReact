import { useEffect, useState } from "react";
import axios from 'axios';
import Header from "../component/Header";
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "./utils/AuthContext";

function EditOrder() {

    // Authentication
    const { isAuthenticated, jwtToken } = useAuth();
    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [items, setItems] = useState(null);
    const [stocks, setStock] = useState(null);
    const [orderedItems, setOrderedItem] = useState(null);

    const [itemQty, setItemQty] = useState("");
    function handleQty(event) {
        setItemQty(event.target.value);
    }

    useEffect(() => {
        if (isAuthenticated) {
            axios.get(`http://localhost:8080/order/${id}`, config)
                .then(function (response) {
                    setOrder(response.data);
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
            axios.get('http://localhost:8080/items', config)
                .then(function (response) {
                    setItems(response.data);
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
            axios.get("http://localhost:8080/stocks", config)
                .then(function (response) {
                    setStock(response.data);
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
            axios.get(`http://localhost:8080/order/${id}/ordereditems`, config)
                .then(function (response) {
                    setOrderedItem(response.data);
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

    }, [isAuthenticated])

    function getOrderedItems() {
        axios.get(`http://localhost:8080/order/${id}/ordereditems`, config)
            .then(function (response) {
                setOrderedItem(response.data);
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div className="EditOrder">
            <Header />
            <div className="text-center">
                <h3 className="display-4"> Shopping Cart</h3>
                <button className="btn btn-info" onClick={() => {
                    navigate("/order")
                }}>Back to the Order</button>
            </div>


            <h1>Add Items To Order:{id}</h1>
            {
                order &&
                <div className='order-details'>
                    <div className='d-flex align-item-center justify-content-between'>
                        <div className='datetime'>
                            Date and Time: {order.orderDate}
                        </div>
                        <div className='total-price'>
                            Total Price Rs.<h3>{order.totalPrice}</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-9">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>#ID</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Quntity</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderedItems &&
                                        orderedItems.map((item) => (
                                            <tr>
                                                <td>{item.item.id}</td>
                                                <td>{item.item.name}</td>
                                                <td>{item.item.price}</td>
                                                <td>{item.qty}</td>
                                                <td>
                                                    <button type="button" className="btn btn-danger" onClick={() => {
                                                        axios.delete(`http://localhost:8080/order/${id}/item/${item.id}`, config)
                                                            .then(function (response) {
                                                                setOrder(response.data);
                                                                console.log(response);
                                                            })
                                                            .catch(function (error) {
                                                                console.log(error);
                                                            })
                                                    }}>Remove</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className="btn btn-success" onClick={() => {
                                axios.post(`http://localhost:8080/order/completed/${id}`, config)
                                    .then(function (response) {
                                        navigate('/order');
                                        console.log(response);
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    })
                            }}>Mark as Completed(Checkout)
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className="items">
                                {/* {
                                    items && items.map((item) => (
                                        <div className="item p-3 bg-light shadow-sm mb-2 rounded">
                                            <h5>{item.name}</h5>
                                            <div>Rs. {item.price}</div>
                                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => {
                                                const data = {
                                                    itemId: item.id,
                                                    qty: 1
                                                }
                                                axios.post(`http://localhost:8080/order/${id}/addItem`, data, config)
                                                    .then(function (response) {
                                                        setOrder(response.data);
                                                        console.log(response);
                                                    })
                                                    .catch(function (error) {
                                                        console.log(error);
                                                    })
                                            }}>Add</button>
                                        </div>
                                    ))
                                } */}
                                {
                                    stocks && stocks.map((stockItem) => (
                                        <div className="item p-3 bg-light shadow-sm mb-2 rounded">
                                            <h5>{stockItem.item.name}</h5>
                                            <div>Rs. {stockItem.item.price}</div>
                                            <div>Quntity: {stockItem.qty}</div>
                                            <form>
                                                <input type="text" placeholder="Enter Quantity" onChange={handleQty} required />
                                            </form>
                                            {
                                                stockItem.qty <= itemQty &&
                                                <span className="label label-warning">Out of Stock</span>

                                            }

                                            {
                                                itemQty && stockItem.qty >= itemQty &&
                                                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => {
                                                    const data = {
                                                        itemId: stockItem.item.id,
                                                        qty: itemQty
                                                    }
                                                    axios.post(`http://localhost:8080/order/${id}/addItem`, data, config)
                                                        .then(function (response) {
                                                            getOrderedItems();
                                                            setOrder(response.data);
                                                            console.log(response);
                                                        })
                                                        .catch(function (error) {
                                                            console.log(error);
                                                        })
                                                }}>Add</button>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default EditOrder;