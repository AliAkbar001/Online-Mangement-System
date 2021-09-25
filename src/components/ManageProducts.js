import React, { useState,useEffect }  from 'react';
import {AiFillDelete} from "react-icons/ai";
import {FaEdit} from "react-icons/fa";
import {BsFillImageFill} from "react-icons/bs";
import {AiFillCloseCircle} from "react-icons/ai";
import { productURL } from '../fetch_data/apiUrl';
import Progressbar from './Progressbar';

export default function ManageProducts() {
    const [searchBy, setSearchBy] = useState("Code");
    const [data, setData] = useState(false);
    const [form, setForm] = useState(false);
    const [getData, setGetData] = useState(false);

    useEffect(() => {
    fetch(productURL)
    .then(res => res.json())
    .then(
        (result)=>{
            setGetData(result);
            },
        (error) => {
            setGetData(error);
        }
    )
    },[]);
      
    function toggleModel(e){
        if(e==="view"){
            data ? setData(false) : setData(true);
        }else if(e==="form"){
            form ? setForm(false) : setForm(true);
        }
        
    }
    function handleClick(e){
        setSearchBy(e.target.value);
    }
    return (
        <div className="manage-products">
            <div className="manage-products-top">
                <input type="search" placeholder={"Search Product By " + searchBy}/>
                <select value={searchBy} onChange={handleClick}>
                    <option value="Code">Code</option>
                    <option value="Name">Name</option>
                    <option value="Company">Company</option>
                    <option value="Category">Category</option>
                    <option value="Quantity">Quantity</option>
                    <option value="Purchase Price">Purchase</option>
                    <option value="Total Quantity">Sold Quantity</option>
                    <option value="Expire Date">Expiry Date</option>
                </select>
                <select>
                    <option value="">--- Sort By ---</option>
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
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Code</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Purchase Price(RS)</th>
                        <th scope="col">Selling Price(RS)</th>
                        <th scope="col">Available Quantity</th>
                        <th scope="col">Company</th>
                        <th scope="col">Expire Date</th>
                        <th colSpan="2" scope="col">Options</th>
                    </tr>
            </thead>
            <tbody>
            {getData ?  (getData.map(product =>(
                    <tr key={product._id}>
                    <td data-label="Code">{product._id}</td>
                    <td data-label="Name">{product.name}</td>
                    <td data-label="Category">{product.category}</td>
                    <td data-label="Purchase Price(RS)">{product.purchase_price}</td>
                    <td data-label="Selling Price(RS)">{product.selling_price}</td>
                    <td data-label="Available Quantity">{product.quantity}</td>
                    <td data-label="Company">{product.company}</td>
                    <td data-label="Expire Date">{product.expiry_date}</td>
                    <td data-label="Options">
                    <div className="manage-buttons">
                        <button className="view-product" title="Product Image" onClick={()=>toggleModel("view")}><BsFillImageFill size="1.5rem"/></button>
                        <button className="update-product" title="Edit Product" onClick={()=>toggleModel("form")}><FaEdit size="1.5rem"/></button>
                        <button className="delete-product" title="Delete Product"><AiFillDelete size="1.5rem"/></button>
                        </div>
                    </td>
                </tr>))):
                <tr>
                    <td colSpan="9"><Progressbar visibility={true}/></td>
                </tr>}
            </tbody>
        </table>
        {data && (
        <div className="popup-container">
            <div className="popup">
                <div className="product-details">
                    <img src="https://images.unsplash.com/photo-1630327064614-4e74d61f2a24?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Dress 5"/>
                    <div>
                        <h4>Name: <span>0</span></h4>
                        <h4>Product Code: <span>0</span></h4>
                        <h4>Category: <span>0</span></h4>
                        <h4>Company: <span>0</span></h4>
                        <h4>Sold Quantity: <span>0</span></h4>
                        <h4>Available Quantity: <span>0</span></h4>
                        <h4>Total Quantity: <span>0</span></h4>
                        <h4>Image Name: <span>0</span></h4>
                        <h4>Purchase Price: <span>0</span></h4>
                        <h4>Selling Price: <span>0</span></h4>
                        <h4>Sold Quantity: <span>0</span></h4>
                        <h4>Expiry Date: <span>0</span></h4>
                    </div>
                    <span className="close-product"><AiFillCloseCircle size="1.7rem" onClick={()=>toggleModel("view")}/></span>
                    <button onClick={()=>toggleModel("view")}>Close</button>
                </div>
            </div>
        </div>
        )}
        {form && (
        <div className="popup-container">
            <div className="popup">
                <h2>Edit Product</h2>
                <div className="form-modal">
                    <form className="product-data-form">
                    <div>
                    <label>Product Code</label>
                    <input type="text" name="product_code" disabled/>
                    </div>
                    <div>
                    <label>Select Image</label>
                    <input type="file" accept="image/*" name="image_url"/>
                    </div>
                    <div>
                    <label>Product Name</label>
                    <input type="text" name="name" required/>
                    </div>
                    <div>
                    <label>Category</label>
                    <input type="text" name="category" required/>
                    </div>
                    <div>
                    <label>Purchase Price(RS)</label>
                    <input type="number"  min="0" name="purchase_price" required/>
                    </div>
                    <div>
                    <label>Selling Price(RS)</label>
                    <input type="number"  min="0" name="selling_price"/>
                    </div>
                    <div>
                    <label>Quantity</label>
                    <input type="number"  min="0" name="quantity" required/>
                    </div>
                    <div>
                    <label>Company</label>
                    <input type="text" name="company" required/>
                    </div>
                    <div>
                    <label>Expire Date</label>
                    <input type="date" name="expire_date" required/>
                    </div>
                    <div>
                    <button type="submit">Edit Product</button>
                    </div> 
                    </form>
                    <img src="https://images.unsplash.com/photo-1553272725-086100aecf5e?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw3Mnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Dress 6"/>
                    <span><AiFillCloseCircle size="1.7rem" onClick={()=>toggleModel("form")}/></span>
                    <button className="close-product" onClick={()=>toggleModel("form")}>Close</button>
                </div>
            </div>
        </div>
        )}
        </div>
    )
}
