import { useEffect, useState } from "react";
import axios from 'axios';
import Header from "../component/Header";
import { useAuth } from "./utils/AuthContext";

export default function Stock() {

    // Authentication
    const { isAuthenticated, jwtToken } = useAuth();
    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    const [stocks, setStock] = useState(null);
    const [items, setItem] = useState(null);
    const [edit, setEdit] = useState(null);
    const [stockId, setStockId] = useState(null);

    //get
    useEffect(() => {
        if (isAuthenticated) {
            axios.get("http://localhost:8080/items", config)
                .then(function (response) {
                    setItem(response.data);
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
        }
    }, [isAuthenticated]);
    function getStocks() {
        axios.get("http://localhost:8080/stocks", config)
            .then(function (response) {
                setStock(response.data);
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    //end-get

    const [qty, setQty] = useState("");
    const [location, setLocation] = useState("");
    const [itemId1, setItemId] = useState("");

    function handleQty(event) {
        setQty(event.target.value);
    }
    function handleLocation(event) {
        setLocation(event.target.value);
    }
    function handleItemId(event) {
        setItemId(event.target.value);
    }

    //create
    function createStock(event) {
        event.preventDefault();
        const data = {
            qty: qty,
            location: location,
            itemId: itemId1
        }
        axios.post("http://localhost:8080/stock", data, config)
            .then(function (response) {
                setQty("");
                setLocation("");
                setItemId("");
                getStocks();
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    //end-create

    // update
    function updateStock(event) {
        event.preventDefault();
        const data = {
            qty: qty,
            location: location,
            itemId: itemId1
        }
        axios.put("http://localhost:8080/stock/" + stockId, data, config)
            .then(function (response) {
                setQty("");
                setLocation("");
                setItemId("");
                getStocks();
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <>
            <Header />
            <div className="text-center">
                <h1 className="display-5">Item Category</h1>
            </div>
            <div className="row">
                <div className="col-5">

                    {/* create */}
                    {
                        !edit &&
                        <form onSubmit={createStock}>
                            <div>
                                <label>Quntitiy of item</label>
                                <input type="text" value={qty} onChange={handleQty} required />
                            </div>
                            <div>
                                <label>Location</label>
                                <input type="text" value={location} onChange={handleLocation} />
                            </div>
                            <div class="form-group">
                                <label for="singleSelectListBox">Single-Select List Box:</label>
                                <select class="form-control" onChange={handleItemId} id="singleSelectListBox">
                                    <option value="value">Select Category</option>
                                    {
                                        items && items.map((item) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <button type="submit" className="btn btn-success">Add Stock</button>
                        </form>
                    }
                    {/* create-end */}

                    {/* update */}
                    {
                        edit &&
                        <form onSubmit={updateStock}>
                            <div>
                                <label>Quntitiy of product</label>
                                <input type="text" value={qty} onChange={handleQty} required />
                            </div>
                            <div>
                                <label>Location</label>
                                <input type="text" value={location} onChange={handleLocation} />
                            </div>
                            <div className="form-group">
                                <label for="singleSelectListBox">Single-Select List Box:</label>
                                <select className="form-control" onChange={handleItemId} id="singleSelectListBox">
                                    <option value="value">Select Category</option>
                                    {
                                        items && items.map((item) => (
                                            <option key={item.id} value={item.id} selected={item.id === itemId1}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <button type="submit" className="btn btn-success">Update Stock</button>
                        </form>
                    }
                    {/* end-update */}
                </div>

                <div className="col-7">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Quntitiy</th>
                                <th scope="col">Location</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                stocks && stocks.map((row) => (
                                    <tr>
                                        <th scope="row">{row.id}</th>
                                        <td>{row.qty}</td>
                                        <td>{row.location}</td>
                                        <td>{row.item.name}</td>
                                        <td>
                                            <button type="button" className="btn btn-warning" onClick={() => {
                                                setEdit(true);
                                                setStockId(row.id);
                                                setQty(row.qty);
                                                setLocation(row.location);
                                                setItemId(row.item?.id);
                                            }}>Edit</button>
                                            <button type="button" className="btn btn-danger" onClick={() => {
                                                axios.delete(`http://localhost:8080/stock/${row.id}`, config)
                                                    .then(function (response) {
                                                        getStocks();
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
                </div>
            </div>
        </>
    )
}