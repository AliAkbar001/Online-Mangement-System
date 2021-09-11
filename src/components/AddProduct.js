import React from 'react'

export default function AddProduct() {
    
    return (
        <div className="add-product">
            <div className="form-modal add-product-form">
                <form className="product-data-form" autoComplete="off" enctype="multipart/form-data">
                    <div>
                    <label>Product Code</label>
                    <input type="text" name="_id" required/>
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
                    <button type="submit">Add Product</button>
                    </div> 
                </form>
                <img src="https://images.unsplash.com/photo-1630277922011-8241795086ae?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Dress 6"/>
                <span></span>
            </div>
        </div>
    )
}
