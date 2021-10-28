import React,{useState, useEffect} from 'react'
import { productURL,productImage } from '../fetch_data/apiUrl';

export default function AddProduct() {

const [productCode, setProductCode] = useState("");
const [productImages, setProductImages] = useState(productImage + "ph.png");
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

function handleChange(e){
    var name = e.target.name;
    if(name === '_id'){
        var value = e.target.value;
        setProductCode(value);
    }else if(name === "product_image"){
        setProductImages(URL.createObjectURL(e.target.files[0]));
    }
}

function onSubmit(e){
    e.preventDefault();
    getData && getData.map((product)=> ( productCode === product._id && alert("This code is added")));
        const formData = new FormData(document.getElementById("product-form"));
        fetch(productURL,{
            body: formData,
            method: "post"
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.insertedId === productCode){
                alert("Product Add Successfully");
            }else{
                alert("Error Found")
            }
        })
}

    return (
        <div className="add-product">
            <div className="form-modal add-product-form">
                <form className="product-data-form" onSubmit={onSubmit} autoComplete="off" encType="multipart/form-data" id="product-form">
                    <div>
                    <label>Product Code</label>
                    <input type="text" name="_id" value={productCode} onChange={handleChange} required/>
                    <input type="text" name="action" value="add" hidden/>
                    </div>
                    <div>
                    <label>Select Image</label>
                    <input type="file" accept="image/*" name="product_image" onChange={handleChange}/>
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
                    <input type="number"  min="0" name="purchase_price" />
                    </div>
                    <div>
                    <label>Selling Price(RS)</label>
                    <input type="number"  min="0" name="selling_price" required/>
                    </div>
                    <div>
                    <label>Quantity</label>
                    <input type="number"  min="0" name="quantity" required/>
                    </div>
                    <div>
                    <label>Company</label>
                    <input type="text" name="company"/>
                    </div>
                    <div>
                    <label>Expire Date</label>
                    <input type="date" name="expiry_date"/>
                    </div>
                    <div>
                    <button type="submit">Add Product</button>
                    </div> 
                </form>
                 <img src={productImages} alt="Dress 6"/>  
                <span></span>
            </div>
        </div>
    )
}
