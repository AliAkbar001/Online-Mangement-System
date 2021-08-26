import React, { useState }  from 'react';
import {AiFillDelete} from "react-icons/ai";
import {FaEdit} from "react-icons/fa";
import {BsFillImageFill} from "react-icons/bs";

export default function ManageProducts() {
    const [searchBy, setSearchBy] = useState("Code");
    function handleClick(e){
        setSearchBy(e.target.value);
        console.log(searchBy);
    }
    return (
        <div className="manage-products">
            <div className="manage-products-top">
                <input type="search" placeholder={"Search Product By " + searchBy}/>
                <select value={searchBy} onChange={handleClick}>
                    <option value="Code">Code</option>
                    <option value="Name">Name A-Z</option>
                    <option value="Company">Company A-Z</option>
                    <option value="Category">Category A-Z</option>
                    <option value="Quantity">Quantity 0-1</option>
                    <option value="Purchase Price">Purchase Price 0-1</option>
                    <option value="Total Quantity">Sold Quantity 0-1</option>
                    <option value="Expire Date">Expiry Date 0-1</option>
                </select>
                <select>
                    <option value="">Sort By</option>
                    <option value="code">Code</option>
                    <option value="name">Name A-Z</option>
                    <option value="company">Company A-Z</option>
                    <option value="category">Category A-Z</option>
                    <option value="quantity">Quantity 0-1</option>
                    <option value="purchase_price">Purchase Price 0-1</option>
                    <option value="total_quantity">Sold Quantity 0-1</option>
                    <option value="expire_date">Expiry Date 0-1</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Code</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Purchase Price(RS)</th>
                        <th scope="col">Selling Price(RS)</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Company</th>
                        <th scope="col">Expire Date</th>
                        <th colSpan="2" scope="col">Options</th>
                    </tr>
            </thead>
            <tbody>
                <tr>
                    <td data-label="Code">0</td>
                    <td data-label="Name">0</td>
                    <td data-label="Category">0</td>
                    <td data-label="Purchase Price(RS)">0</td>
                    <td data-label="Selling Price(RS)">0</td>
                    <td data-label="Quantity">0</td>
                    <td data-label="Company">0</td>
                    <td data-label="Expire Date">0</td>
                    <td data-label="Options">
                        <div>
                        <button title="Product Image"><BsFillImageFill size="1.5rem"/></button>
                        <button title="Edit Product"><FaEdit size="1.5rem"/></button>
                        <button title="Delete Product"><AiFillDelete size="1.5rem"/></button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td data-label="Code">0</td>
                    <td data-label="Name">0</td>
                    <td data-label="Category">0</td>
                    <td data-label="Purchase Price(RS)">0</td>
                    <td data-label="Selling Price(RS)">0</td>
                    <td data-label="Quantity">0</td>
                    <td data-label="Company">0</td>
                    <td data-label="Expire Date">0</td>
                    <td data-label="Options">
                        <div>
                        <button title="Product Image"><BsFillImageFill size="1.5rem"/></button>
                        <button title="Edit Product"><FaEdit size="1.5rem"/></button>
                        <button title="Delete Product"><AiFillDelete size="1.5rem"/></button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    )
}
