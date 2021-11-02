import React, { useState,useEffect }  from 'react';
import {AiFillDelete} from "react-icons/ai";
import {FaEdit} from "react-icons/fa";
import {BsFillImageFill} from "react-icons/bs";
import {AiFillCloseCircle} from "react-icons/ai";
import { productURL,productImage} from '../fetch_data/apiUrl';
import Progressbar from './Progressbar';

export default function ManageProducts() {
    const [viewProduct, setViewProduct] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [sortData, setSortData] = useState(false);
    const [searchData, setSearchData] = useState("");
    const [searchCategory, setSearchCategory] = useState("_id");
    const [searchBy, setSearchBy] = useState("Code");
    const [getData, setGetData] = useState(false);
    const [displayData, setDisplayData] = useState(false);
    const [productPhoto, setProductPhoto] = useState(false);
    const [deleteID, setDeleteID] = useState(false);
    

    useEffect(() => {
    fetch(productURL)
    .then(res => res.json())
    .then(
        (result)=>{
            console.log(sortData);
            var data =  result.sort((a, b) => {
                if(sortData === "_id"||sortData === "code"){
                    return parseInt(b.id) - parseInt(a.id);
                }else if(sortData === "name"){
                    return a.name.localeCompare(b.name);
                }else if(sortData === "company"){
                    return a.company.localeCompare(b.company);
                }else if(sortData === "category"){
                    return a.category.localeCompare(b.category);
                }else if(sortData === "selling_price"){
                    return parseInt(a.selling_price) - parseInt(b.selling_price);
                }else if(sortData === "purchase_price"){
                    return parseInt(a.purchase_price) - parseInt(b.purchase_price);
                }else if(sortData === "quantity"){
                    return parseInt(a.quantity) - parseInt(b.quantity);
                }else if(sortData === "expiry_date"){
                    return a.expiry_date.localeCompare(b.expiry_date);
                }
            });
            setGetData(data);
            },
        (error) => {
            setGetData(error);
        }
    )
    },[displayData,deleteID,sortData]);
      
    function deleteProduct(id){
        const options = {
          method: 'DELETE'
        }
        fetch(`${productURL}/${id}`, options)
        .then(res => res.json())
          .then(
            (result) => {
              setDeleteID(id);
              console.log(result.delete);
            },
            (error) => {
                console.log(error);
            }
          )
    }


    function toggleModel(e,product){
        setDisplayData(product);
        if(e==="view"){
            viewProduct ? setViewProduct(false) : setViewProduct(true);
        }else if(e==="form"){
            if(editForm){
                setEditForm(false) 
                setProductPhoto(false)
            }else{
                setEditForm(true);
            }    
        }
        
    }

    function handleChange(e){
        const name = e.target.name;
        var value = e.target.value;
        setDisplayData({...displayData,[name]:value});
        if(name === "product_image"){
           if(e.target.files[0]!==""){
                setProductPhoto(URL.createObjectURL(e.target.files[0]));
        }
    }
}
function handleClick(e){
    var value = e.target.value;
    setSearchCategory(value);
    if(value === "_id"){
        setSearchBy("Code");
    }else if(value === "selling_price"){
        setSearchBy("Selling Price");
    }else if(value === "name"){
        setSearchBy("Name");
    }else if(value==="company"){
        setSearchBy("Company");
    }else if(value==="category"){
        setSearchBy("Category");
    }else if(value==="quantity"){
        setSearchBy("Quantity");
    }else if(value==="purchase_price"){
        setSearchBy("Purchase Price");
    }else if(value==="sold_quantity"){
        setSearchBy("Sold Quantity");
    }else if(value==="expiry_date"){
        setSearchBy("Expiry Date");
    }
    
}
    function onSubmit(e){
        e.preventDefault();
            const formData = new FormData(document.getElementById("product-form"));
            fetch(productURL,{
                body: formData,
                method: "post"
            })
            .then((res) => res.json())
            .then((data) => {
                if(data.matchedCount > 0){
                    alert("Product Update Successfully");
                    setDisplayData(false);
                }else{
                    alert("Error Found")
                }
            })
    }
    return (
        <div className="manage-products">
            <div className="manage-products-top">
                <input type="search" value={searchData} onChange={(e)=>setSearchData(e.target.value)} placeholder={"Search Product By " + searchBy}/>
                <select onChange={handleClick}>
                    <option value="_id">Code</option>
                    <option value="name">Name</option>
                    <option value="company">Company</option>
                    <option value="category">Category</option>
                    <option value="quantity">Quantity</option>
                    <option value="purchase_price">Purchase Price</option>
                    <option value="selling_price">Selling Price</option>
                    <option value="expiry_date">Expiry Date</option>
                </select>
                <select onChange={(e)=>setSortData(e.target.value)}>
                    <option value="">--- Sort By ---</option>
                    <option value="_id">Code</option>
                    <option value="name">Name A-Z</option>
                    <option value="company">Company A-Z</option>
                    <option value="category">Category A-Z</option>
                    <option value="quantity">Quantity 0-1</option>
                    <option value="selling_price">Selling Price 0-1</option>
                    <option value="purchase_price">Purchase Price 0-1</option>
                    <option value="expiry_date">Expiry Date 0-1</option>
                </select>
            </div>
            { !getData ? <div><Progressbar visibility={true}/></div>:
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
         {searchData!==""?(getData.filter((product)=> product[searchCategory].toString().indexOf(searchData.toLowerCase())>-1).map(product =>( 
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
                 <button className="view-product" title="Product Image" onClick={()=>toggleModel("view",product)}><BsFillImageFill size="1.5rem"/></button>
                 <button className="update-product" title="Edit Product" onClick={()=>toggleModel("form",product)}><FaEdit size="1.5rem"/></button>
                 <button className="delete-product" title="Delete Product" onClick={()=>deleteProduct(product._id)}><AiFillDelete size="1.5rem"/></button>
                 </div>
             </td>
            </tr>
        ))) : (getData.map(product =>(
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
                     <button className="view-product" title="Product Image" onClick={()=>toggleModel("view",product)}><BsFillImageFill size="1.5rem"/></button>
                     <button className="update-product" title="Edit Product" onClick={()=>toggleModel("form",product)}><FaEdit size="1.5rem"/></button>
                     <button className="delete-product" title="Delete Product" onClick={()=>deleteProduct(product._id)}><AiFillDelete size="1.5rem"/></button>
                     </div>
                 </td>
             </tr>)))
    }
         </tbody>
     </table> }
           
        {viewProduct && (
        <div className="popup-container">
            <div className="popup">
                { displayData && (
                <div className="product-details">
                    <img src={productImage + (displayData.product_image !== "none" ? displayData.product_image : "ph.png")} alt={displayData.product_image}/>
                    <div>
                        <h4>Name: <span>{displayData.name}</span></h4>
                        <h4>Product Code: <span>{displayData._id}</span></h4>
                        <h4>Category: <span>{displayData.category}</span></h4>
                        <h4>Company: <span>{displayData.company}</span></h4>
                        <h4>Sold Quantity: <span>{displayData.sold_quantity}</span></h4>
                        <h4>Available Quantity: <span>{displayData.quantity}</span></h4>
                        <h4>Image Name: <span>{displayData.product_image}</span></h4>
                        <h4>Purchase Price: <span>{displayData.purchase_price}</span></h4>
                        <h4>Selling Price: <span>{displayData.selling_price}</span></h4>
                        <h4>Expiry Date: <span>{displayData.expiry_date}</span></h4>
                    </div>
                    <span className="close-product"><AiFillCloseCircle size="1.7rem" onClick={()=>toggleModel("view")}/></span>
                    <button onClick={()=>toggleModel("view")}>Close</button>
                </div>
                )}
            </div>
        </div>
        )}
        { editForm && (
            displayData && (
        <div className="popup-container">
            <div className="popup">
                <h2>Edit Product</h2>
                <div className="form-modal">
                    <form className="product-data-form" onSubmit={onSubmit} autoComplete="off" encType="multipart/form-data" id="product-form">
                    <div>
                    <label>Product Code</label>
                    <input type="text" name="_id" value={displayData._id} disabled/>
                    <input type="text" name="_id" value={displayData._id} hidden/>
                    <input type="text" name="action" value="update" hidden/>
                    </div>
                    <div>
                    <label>Product Name</label>
                    <input type="text" name="name" value={displayData.name} onChange={handleChange} required/>
                    </div>
                    <div>
                    <label>Select Image</label>
                    <input type="file" accept="image/*" name="product_image" onChange={handleChange}/>
                    </div>
                    <div>
                    <label>Category</label>
                    <input type="text" name="category" value={displayData.category} onChange={handleChange}/>
                    </div>
                    <div>
                    <label>Purchase Price(RS)</label>
                    <input type="number"  min="0" name="purchase_price" value={displayData.purchase_price} onChange={handleChange} required/>
                    </div>
                    <div>
                    <label>Selling Price(RS)</label>
                    <input type="number"  min="0" name="selling_price" value={displayData.selling_price} onChange={handleChange} required/>
                    </div>
                    <div>
                    <label>Quantity</label>
                    <input type="number"  min="0" name="quantity" value={displayData.quantity} onChange={handleChange} required/>
                    </div>
                    <div>
                    <label>Company</label>
                    <input type="text" name="company" value={displayData.company} onChange={handleChange}/>
                    </div>
                    <div>
                    <label>Expire Date</label>
                    <input type="date" name="expiry_date"value={displayData.expiry_date} onChange={handleChange}/>
                    </div>
                    <div>
                    <button type="submit">Edit Product</button>
                    </div> 
                    </form>
                    <img src={!productPhoto ? (productImage + (displayData.product_image !== "none" ? displayData.product_image : "ph.png")):productPhoto} alt={displayData.product_image}/>
                    <span><AiFillCloseCircle size="1.7rem" onClick={()=>toggleModel("form")}/></span>
                    <button className="close-product" onClick={()=>toggleModel("form")}>Close</button>
                </div>
            </div>
        </div>
        ))}
        </div>
    )
}
