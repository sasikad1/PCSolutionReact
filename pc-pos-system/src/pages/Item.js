import { useEffect, useState } from "react";
import axios from 'axios';
import Header from "../component/Header";
import { useAuth } from "./utils/AuthContext";
import '../css/Item.css';

function Item() {
    // Authentication
    const { isAuthenticated, jwtToken } = useAuth();
    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    // get item
    const [items, setItems] = useState(null);
    const [categories, setCategories] = useState(null);


    useEffect(() => {
        if (isAuthenticated) {
            axios.get("http://localhost:8080/items", config)
                .then(function (response) {
                    setItems(response.data);
                    console.log(response);
                })
                .catch(function (error) {
                    console.error(error);
                });
            axios.get("http://localhost:8080/itemcategorys", config)
                .then(function (response) {
                    setCategories(response.data);
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }, [isAuthenticated])


    function getItems() {
        axios.get("http://localhost:8080/items", config)
            .then(function (response) {
                setItems(response.data);
                console.log(response);
            })
            .catch(function (error) {
                console.error(error);
            })
        axios.get("http://localhost:8080/itemcategorys", config)
            .then(function (response) {
                setCategories(response.data);
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    //end get

    //create
    const [itemname, setItemName] = useState("");
    const [itemprice, setItemPrice] = useState("");
    const [itemdescription, setItemDescription] = useState("");
    const [itemcategoryid, setItemCategoryId] = useState("");

    function handleName(event) {
        setItemName(event.target.value);
    }
    function handlePrice(event) {
        setItemPrice(event.target.value);
    }
    function handleDescription(event) {
        setItemDescription(event.target.value);
    }
    function handleItemCategoryId(event) {
        setItemCategoryId(event.target.value);
    }

    function createItem(event) {
        event.preventDefault();
        const data = {
            name: itemname,
            price: itemprice,
            description: itemdescription,
            itemcategoryId: itemcategoryid
        }
        axios.post("http://localhost:8080/item", data, config)
            .then(function (response) {
                getItems();
                setItemName("");
                setItemPrice("");
                setItemDescription("");
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    // end create

    // edit
    const [edit, setEdit] = useState(null);
    const [itemId, setItemId] = useState(null);

    function updateItem(event) {
        event.preventDefault();
        const data = {
            name: itemname,
            price: itemprice,
            description: itemdescription,
            itemcategoryId: itemcategoryid
        }
        axios.put("http://localhost:8080/item/" + itemId, data, config)
            .then(function (response) {
                getItems();
                setEdit(null);
                setItemName("");
                setItemPrice("");
                setItemDescription("");
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    // end edit

    return (
        <div className="Item">
            <Header />


            {/* <div>
                <button type="button" className="btn btn-primary" onClick={getItems}>Get Items</button>
            </div> */}


            <div className="row">
                <div className="form col-4">
                    <div className="text-center">
                        <h1 className="display-5">Item Page</h1>
                    </div>

                    {/* create */}
                    {
                        !edit &&
                        <form  onSubmit={createItem}>
                            <div className="input-line form-group">
                                <label>Item Name:</label>
                                <input class="form-control" type="text" value={itemname} onChange={handleName} required />
                            </div>
                            <div className="input-line">
                                <label>Item Price</label>
                                <input class="form-control" type="text" value={itemprice} onChange={handlePrice} required />
                            </div>
                            <div className="input-line">
                                <label>Item Description</label>
                                <input class="form-control" type="text" value={itemdescription} onChange={handleDescription} required />
                            </div>
                            <div className="form-group input-line">
                                <label for="singleSelectListBox">Single-Select List Box:</label>
                                <select className="form-control" onChange={handleItemCategoryId} id="singleSelectListBox">
                                    <option value="value">Select Category</option>
                                    {
                                        categories && categories.map((category) => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <button type="submit" className="btn btn-success btn-su">Submit</button>
                        </form>
                    }
                    {/* end-create */}

                    {/* update */}
                    {
                        edit &&
                        <form onSubmit={updateItem}>
                            <div>
                                <label>Item Name</label>
                                <input type="text" class="form-control" onChange={handleName} value={itemname} required />
                            </div>
                            <div>
                                <label>Item Price</label>
                                <input type="text" class="form-control" onChange={handlePrice} value={itemprice} required />
                            </div>
                            <div>
                                <label>Item Description</label>
                                <input type="text" class="form-control" onChange={handleDescription} value={itemdescription} required />
                            </div>
                            <div className="form-group">
                                <label for="singleSelectListBox">Single-Select List Box:</label>
                                <select className="form-control" onChange={handleItemCategoryId} id="singleSelectListBox">
                                    <option value="value">Select Category</option>
                                    {
                                        categories && categories.map((category) => (
                                            <option key={category.id} value={category.id} selected={category.id === itemcategoryid}>{category.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <button type="submit" className="btn btn-success">Update</button>
                        </form>
                    }
                    {/* end-update */}
                </div>

                <div className="table col-8">
                    <table className="table table-striped">
                        <thead>
                            <tr className="t-header">
                                <th scope="col">#</th>
                                <th scope="col">ItemName</th>
                                <th scope="col">Unit Price</th>
                                <th scope="col">Description</th>
                                <th scope="col">Category</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        <tbody className="t-body">
                            {
                                items && items.map((row) => (
                                    <tr >
                                        <th scope="row">{row.id}</th>
                                        <td>{row.name}</td>
                                        <td>{row.price}</td>
                                        <td>{row.description}</td>
                                        <td>{row.itemCategory.name}</td>
                                        <td>
                                            <button type="button" className="btn btn-warning btn-wa" onClick={() => {
                                                setEdit(true);
                                                setItemId(row.id);
                                                setItemName(row.name);
                                                setItemPrice(row.price);
                                                setItemDescription(row.description);
                                                setItemCategoryId(row.itemCategory?.id);
                                            }}>Edit</button>
                                            <button type="button" className="btn btn-danger btn-da" onClick={() => {
                                                axios.delete(`http://localhost:8080/item/${row.id}`, config)
                                                    .then(function (response) {
                                                        getItems();
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
        </div>
    )
}

export default Item;