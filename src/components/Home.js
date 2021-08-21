import React from 'react';
import {AiFillDelete} from "react-icons/ai";

export default function Home() {
    return (
        <div className="home">
            <div className="home-add-product">
                <p>Add Product</p>
                <div className="home-img-form">
                <img src="/images/dress1.jpg" alt="ProductImage"/>
                <form>
                    <label>Code:</label>
                    <input type="text"/>
                    <br/>
                    <label>Name:</label>
                    <input type="text"/>
                    <br/>
                    <label>Quantity:</label>
                    <input type="number"/>
                    <br/>
                    <label>Available Quantity:</label>
                    <input type="text"/>
                    <br/>
                    <label>Price:</label>
                    <input type="text"/>
                    <br/>
                    <button>Submit</button>
                </form>
                </div>
            </div>
            <div className="home-table">
                <button>Save & Print</button>
                <button>Save</button>
                <table>
                    <thead>
                    <tr>
                        <th scope="col">Code</th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td scope="row" data-label="Code">1</td>
                        <td data-label="Name">1</td>
                        <td data-label="Quantity">1</td>
                        <td data-label="Price">1</td>
                        <td data-label="Delete"><AiFillDelete/></td>
                    </tr>
                    <tr>
                        <td scope="row" data-label="Code">1</td>
                        <td data-label="Name">1</td>
                        <td data-label="Quantity">1</td>
                        <td data-label="Price">1</td>
                        <td data-label="Delete"><AiFillDelete/></td>
                    </tr>
                    <tr>        
                        <td colSpan="2">Total</td>
                        <td colSpan="3" className="total-price">1000</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    )
}
