import { useEffect, useState } from "react";
import axios from 'axios';
import Header from "../component/Header";
import { useAuth } from "./utils/AuthContext";
import '../css/ItemCategory.css';

export default function ItemCategory() {

    // authenticate
    const { isAuthenticated, jwtToken } = useAuth();
    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    const [itemCategoryName, setCategoryName] = useState("");

    function handleName(event) {
        setCategoryName(event.target.value);
    }

    // get
    const [itemcategorys, setItemCategory] = useState("");
    useEffect(() => {
        if (isAuthenticated) {
            axios.get("http://localhost:8080/itemcategorys", config)
                .then(function (response) {
                    setItemCategory(response.data);
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }, [isAuthenticated])

    function getItemCategory() {
        axios.get("http://localhost:8080/itemcategorys", config)
            .then(function (response) {
                setItemCategory(response.data);
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })

    }
    // end-get

    // create
    function createItemCategory(event) {
        event.preventDefault();
        const data = {
            name: itemCategoryName
        }
        axios.post("http://localhost:8080/itemcategory", data, config)
            .then(function (response) {
                getItemCategory();
                setCategoryName("");
                console.log(response);
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    // end-create

    // edit
    const [edit, setEdit] = useState(null);
    const [itemCategoryId, setItemCategoryId] = useState(null);

    function updateItemCategory(event) {
        event.preventDefault();
        const data = {
            name: itemCategoryName
        }
        axios.put("http://localhost:8080/itemcategory/" + itemCategoryId, data, config)
            .then(function (response) {
                getItemCategory();
                setCategoryName("");
                setEdit(false);
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    // end-edit

    return (
        <div className="ItemCategory">
            <Header />


            <div className="row">
                <div className="col-4 form">
                    <div className="text-center">
                        <h1 className="display-5">Item Category</h1>
                    </div>
                    {/* cerate */}
                    {!edit &&
                        <form onSubmit={createItemCategory}>
                            <div>
                                <label>Item Category Name</label>
                                <input type="text" class="form-control" onChange={handleName} value={itemCategoryName} required />
                            </div>
                            <button type="submit" className="btn btn-success btn-form-sucess">Submit</button>
                        </form>
                    }
                    {/* end-create */}

                    {/* edit */}
                    {edit &&
                        <form onSubmit={updateItemCategory}>
                            <div>
                                <label>Item Category Name</label>
                                <input type="text" class="form-control" onChange={handleName} value={itemCategoryName} required />
                            </div>
                            <button type="submit" className="btn btn-success">Update</button>
                        </form>
                    }
                    {/* end-edit */}
                </div>

                <div className="col-8 table">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                itemcategorys && itemcategorys.map((row) => (
                                    <tr>
                                        <th scope="row">{row.id}</th>
                                        <td>{row.name}</td>
                                        <td>
                                            <button type="button" className="btn btn-warning" onClick={() => {
                                                setEdit(true);
                                                setItemCategoryId(row.id);
                                                setCategoryName(row.name);
                                            }}>Edit</button>
                                            <button type="button" className="btn btn-danger btn-form-danger" onClick={() => {
                                                axios.delete(`http://localhost:8080/itemcategory/${row.id}`, config)
                                                    .then(function (response) {
                                                        getItemCategory();
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