import React,{useState,useEffect} from 'react';
import {AiFillCloseCircle} from "react-icons/ai";
import {billURL} from '../fetch_data/apiUrl';
export default function BillRecords() {
    const [data, setData] = useState(false);
    const [getData, setGetData] = useState(false);
    const [billDetails, setBillDetails] = useState(false);
    const [refresh, setRefresh] = useState(false);

    function toggleModel(billID){
        data ? setData(false) : setData(true) ;
        getData && getData.map(bill => bill._id === billID && setBillDetails(bill))
    }
    useEffect(() => {
        fetch(billURL)
        .then(res => res.json())
        .then(
            (result)=>{
                console.log(result);
                setGetData(result);
                },
            (error) => {
                console.log(error);
            }
        )
    }, [refresh]);

    function handleDeletion(bill){
        console.log(bill);
        const options = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bill)
        };
        fetch(`${billURL}/delete`, options)
        .then(res => res.json())
            .then((result) => {
                setRefresh(!refresh);
            },(error) => {
                console.log(error);
        });
    }
    return (
        <div className="bill-record">
            <div className="bill-record-top-bar">
            <input type="search" placeholder="Bill Number"/>
            <input type="date" placeholder="Select Date"/>
            </div>
            {getData && getData.map(bill =>
            <div className="bill-record-data">
                <div>
                    <h3>{bill._id}</h3>
                    <div className="border-line"></div>
                    <h3>{bill.total_amount}</h3>
                </div>
                <div className="bill-record-buttons">
                    <button onClick={()=>toggleModel(bill._id)}>VIEW</button>
                    <button>Print</button>
                    <button className="delete-btn" onClick={()=>handleDeletion(bill)}>Delete</button>
                </div>
            </div>
            )}
            {data && (
                billDetails && (
            <div className="popup-container">
            <div className="popup">
                <div className="bill-items-top">
                    <h4>{billDetails.date}</h4>
                    <h4>{billDetails._id}</h4>
                    <h4>{billDetails.time}</h4>
                    <span><AiFillCloseCircle size="1.7rem" onClick={()=>toggleModel()}/></span>
                </div>
                <div>
                <table className="table">
                <thead>
                <tr>
                    <th scope="col">Code</th>
                    <th scope="col">Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                </tr>
                </thead>
                <tbody>
                {billDetails.products.map(product=>
                <tr key={product._id}>
                    <td data-label="Code">{product._id}</td>
                    <td data-label="Name">{product.name}</td>
                    <td data-label="Quantity">{product.quantity}</td>
                    <td data-label="Price">{product.selling_price}</td>
                </tr>
                )}
                <tr>
                    <td colSpan="2">Total Amount</td>
                    <td colSpan="2">{billDetails.total_amount}</td>
                </tr>
            </tbody>
            </table>
                </div>
        </div>
        </div>
            ))}
        </div>
    )
}
