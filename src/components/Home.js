import React,{useState, useEffect} from 'react';
import {AiFillDelete} from "react-icons/ai";
import { productURL,billURL,productImage} from '../fetch_data/apiUrl';

export default function Home() {
    const [bill, setBill] = useState(false);
    const [billDetails, setBillDetails] = useState(false);
    const [getData, setGetData] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [productCode, setProductCode] = useState("");
    const [productName, setProductName] = useState("");
    const [productPurchasePrice, setProductPurchasePrice] = useState(0);
    const [productSellingPrice, setProductSellingPrice] = useState(0);
    const [availableQuantity, setAvailableQuantity] = useState(0);
    const [sellingQuantity, setSellingQuantity] = useState(0);
    const [productPhoto, setProductPhoto] = useState("ph.png");
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

    function handleBill(print){
        console.log(bill);
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([...bill])
        };
        fetch(billURL, options)
        .then(res => res.json())
            .then((result) => {
                setBillDetails(result);
                if(print){
                    var content = document.getElementById("bill-table");
                    var pri = document.getElementById("print-bill").contentWindow;
                    pri.document.open();
                    pri.document.write(content.innerHTML);
                    pri.document.close();
                    pri.focus();
                    pri.print();
                }else{
                    alert("Bill Add Successfully");
                }
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
        var name = e.target.name;
        if(name === "_id"){
            setProductCode(value);
            getData &&  getData.filter((product)=>(
                (product._id === value))&&(
                    setProductCode(product._id),
                    setProductName(product.name),
                    setAvailableQuantity(product.quantity),
                    setProductPurchasePrice(product.purchase_price),
                    setProductSellingPrice(product.selling_price),
                    setProductPhoto(product.product_image)
                ));
        }else if(name === "name"){
            setProductName(value);
            getData &&  getData.filter((product)=>(
                (product.name === value))&&(
                    setProductCode(product._id),
                    setProductName(product.name),
                    setAvailableQuantity(product.quantity),
                    setProductPurchasePrice(product.purchase_price),
                    setProductSellingPrice(product.selling_price),
                    setProductPhoto(product.product_image)
                ));
        }

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
        setProductPhoto("ph.png")

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
                <img src={productImage+productPhoto} alt={productPhoto}/>
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
                <button onClick={()=>handleBill(true)}>Save & Print</button>
                <button onClick={()=>handleBill(false)}>Save</button>
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
            {billDetails && (   
            <iframe id="print-bill" style={{display:"none"}} title="Online Management System">
          <div  id="bill-table"  style={{display:"none",width:"100%"}}>
             <h1>MAMA MAX: <h3>{billDetails._id}</h3></h1>
         <table style={{border:"1px solid black",padding:"0.5em",fontSize:"25px",textAlign:"center",borderCollapse: "collapse"}}>
                <thead>
                <tr>
                    <th style={{border:"1px solid black",padding:"0.3em"}}>Name</th>
                    <th style={{border:"1px solid black",padding:"0.3em"}}>Quantity</th>
                    <th style={{border:"1px solid black",padding:"0.3em"}}>Price</th>
                </tr>
                </thead>
                <tbody>
                {bill!="" ? (bill.map((product) =>(
            <tr key={product._id}>
            <td style={{border:"1px solid black",padding:"0.3em"}}>{product.name}</td>
            <td style={{border:"1px solid black",padding:"0.3em"}}>{product.quantity}</td>
            <td style={{border:"1px solid black",padding:"0.3em"}}>{product.selling_price}</td>
        </tr>
        ))):<div className="no-data-found">Empty</div>}              
                    <tr>
                        <td colSpan="2" style={{border:"1px solid black",padding:"0.3em"}}>Total</td>
                        <td colSpan="2" style={{border:"1px solid black",padding:"0.3em"}}>{billDetails.total_amount}</td>
                    </tr>
                </tbody>
            </table>
            <p>Name: ...</p>
             <p>Phone: ...</p>
             <p>Location : ...</p>
             <p>Instagram: ...</p>
         </div>
         </iframe>
         )}
        </div>
    )
}
