import { useEffect, useState } from "react";
import axios from 'axios';
import Header from "../component/Header";
import { useNavigate, useParams } from 'react-router-dom';

function EditOrder() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [items, setItems] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:8080/order/${id}`)
            .then(function (response) {
                setOrder(response.data);
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
        axios.get('http://localhost:8080/items')
            .then(function (response) {
                setItems(response.data);
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <div className="EditOrder">
            <Header />
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
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        order.orderedItems.map((item) => (
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.price}</td>
                                                <td>
                                                    <button type="button" className="btn btn-danger" onClick={() => {
                                                        axios.delete(`http://localhost:8080/order/${id}/item/${item.id}`)
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
                                axios.post(`http://localhost:8080/order/completed/${id}`)
                                    .then(function (response) {
                                        navigate('/order');
                                        console.log(response);
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    })
                            }}>Mark as Completed
                            </div>
                            <button className="btn btn-info" onClick={()=>{
                                navigate("/order")
                            }}>Back to the Order</button>
                        </div>

                        <div className="col-lg-3">
                            <div className="items">
                                {
                                    items && items.map((item) => (
                                        <div className="item p-3 bg-light shadow-sm mb-2 rounded">
                                            <h5>{item.name}</h5>
                                            <div>Rs. {item.price}</div>
                                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => {
                                                const data = {
                                                    itemId: item.id,
                                                    qty: 1
                                                }
                                                axios.post(`http://localhost:8080/order/${id}/addItem`, data)
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