import React,{useState, useEffect} from 'react';
import {AiFillDelete} from "react-icons/ai";
import { productURL,billURL} from '../fetch_data/apiUrl';

export default function Home() {
    const [bill, setBill] = useState(false);
    const [getData, setGetData] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [productCode, setProductCode] = useState("");
    const [productName, setProductName] = useState("");
    const [productPurchasePrice, setProductPurchasePrice] = useState(0);
    const [productSellingPrice, setProductSellingPrice] = useState(0);
    const [availableQuantity, setAvailableQuantity] = useState(0);
    const [sellingQuantity, setSellingQuantity] = useState(0);
    const [refresh, setRefresh] = useState(false);

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
        },[refresh]);

    function handleBill(){
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([...bill])
        };
        fetch(billURL, options)
        .then(res => res.json())
            .then((result) => {
                console.log(result);
                handleVariables();
                setBill(false);
                setTotalAmount(0);
                setRefresh(!refresh);
            },(error) => {
                console.log(error);
        });
    }
    function handleChange(e){
        var value = e.target.value;
        getData &&  getData.filter((product)=>(
            (product.name === value)||(product._id === value))&&(
                setProductCode(product._id),
                setProductName(product.name),
                setAvailableQuantity(product.quantity),
                setProductPurchasePrice(product.purchase_price),
                setProductSellingPrice(product.selling_price)
            ));

    }

    function deleteProduct(e,price){
        var array = [...bill];
        array.splice(e,1);
        setBill([...array]);
        setTotalAmount(parseInt(totalAmount) - parseInt(price));
    }

    function handleVariables(){
        setProductCode("");
        setProductName("");
        setProductPurchasePrice(0);
        setProductSellingPrice(0);
        setAvailableQuantity(0);
        setSellingQuantity(0);
    }
    function handleSubmit(e){
        e.preventDefault();
        if(productCode&&productName&&productSellingPrice&&sellingQuantity){
            if(parseInt(sellingQuantity)>parseInt(availableQuantity)){
                alert("Stock Not Available");
            }else if(parseInt(productSellingPrice)<parseInt(productPurchasePrice)){
                alert("Insert Reasonable Selling Price");
            }else{
                const billProduct = ({
                    _id:productCode,
                    name:productName,
                    quantity:parseInt(sellingQuantity),
                    selling_price:parseInt(sellingQuantity) * parseInt(productSellingPrice)
                });
                if(!bill){
                    setBill([billProduct]);
                    setTotalAmount((parseInt(sellingQuantity) * parseInt(productSellingPrice)) + parseInt(totalAmount));
                    handleVariables();
                }else{
                    var check;
                    bill.map(({_id})=> _id===productCode && (check = true));
                    if(check===true){
                        const alertMsg = window.confirm("This product is already added. Press OK! for replace.");
                        //Press Ok = true //update product price
                        if(alertMsg === false){
                            handleVariables();
                        }else{
                            var updatePrice;
                            bill.map((product)=> product._id === productCode && (
                                updatePrice = product.selling_price,
                                product.quantity = sellingQuantity,
                                product.selling_price = productSellingPrice * sellingQuantity
                                ));
                            setTotalAmount((totalAmount -  updatePrice) + (productSellingPrice * sellingQuantity));
                            handleVariables();  
                        }
                    }else{
                        setBill([billProduct,...bill]);
                        setTotalAmount((parseInt(sellingQuantity) * parseInt(productSellingPrice)) + parseInt(totalAmount));
                        handleVariables();
                    }
                }
            }
        }else{
            alert("Please Fill All Required Fields");
        }
    }
    return (
        <div className="home">
            <div className="home-add-product">
                <p>Add Product</p>
                <div className="home-img-form">
                <img src="https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" alt="ProductImage"/>
                <form onSubmit={handleSubmit}>
                    <label>Code:</label>
                    <input type="text" list="product-code" value={productCode} name="_id" onChange={handleChange} required/>
                    <datalist id="product-code">
                        {getData && getData.map(product =>(
                            <option key={product._id}>
                                {product._id}
                            </option>
                        ))}
                    </datalist>
                    <br/>
                    <label>Name:</label>
                    <input type="text" list="product-name" value={productName} name="name" onChange={handleChange} required/>
                    <datalist id="product-name">
                        {getData && getData.map(product =>(
                            <option key={product._id}>
                                {product.name !== "none" && product.name}
                            </option>
                        ))}
                    </datalist>
                    <br/>
                    <label>Available Quantity:</label>
                    <input type="number" name="available_quantity" value={availableQuantity}/>
                    <br/>
                    <label>Quantity:</label>
                    <input type="number" name="quantity" value={sellingQuantity} onChange={(e)=>setSellingQuantity(e.target.value)} min="1" required/>
                    <br/>
                    <label>Purchase Price:</label>
                    <input type="number" name="purchase_price" value={productPurchasePrice}/>
                    <br/>
                    <label>Selling Price:</label>
                    <input type="number" name="selling_price" value={productSellingPrice} onChange={(e)=>setProductSellingPrice(e.target.value)} required/>
                    <br/>
                    <button>Submit</button>
                </form>
                </div>
            </div>
            <div className="home-table">
                <button>Save & Print</button>
                <button onClick={handleBill}>Save</button>
                <table className="table">
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
                    {bill && bill.map((product,value)=>(
                    <tr key={value}>
                        <td data-label="Code">{product._id}</td>
                        <td data-label="Name">{product.name}</td>
                        <td data-label="Quantity">{product.quantity}</td>
                        <td data-label="Price">{product.selling_price}</td>
                        <td data-label="Delete" onClick={()=>deleteProduct(value,product.selling_price)}><AiFillDelete/></td>
                    </tr>
                    ))}
                    <tr>        
                        <td colSpan="2">Total</td>
                        <td colSpan="3" className="total-price">{totalAmount}</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    )
}
