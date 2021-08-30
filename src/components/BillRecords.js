import React,{useState} from 'react';
import {AiFillCloseCircle} from "react-icons/ai";
export default function BillRecords() {
    const [data, setData] = useState(false);

    function toggleModel(){
        data ? setData(false) : setData(true) ;
    }
    return (
        <div className="bill-record">
            <div className="bill-record-top-bar">
            <input type="search" placeholder="Bill Number"/>
            <input type="date" placeholder="Select Date"/>
            </div>
            <div className="bill-record-data">
                <div>
                    <h3>Bill Number</h3>
                    <div className="border-line"></div>
                    <h3>Rs 2000</h3>
                </div>
                <div className="bill-record-buttons">
                    <button onClick={()=>toggleModel()}>VIEW</button>
                    <button>Print</button>
                    <button className="delete-btn">Delete</button>
                </div>
            </div>
            {data && (
            <div className="popup-container">
            <div className="popup">
                <div className="bill-items-top">
                    <h4>1997-31-05</h4>
                    <h4>Bill Number</h4>
                    <h4>12:00:00</h4>
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
                <tr>
                    <td data-label="Code">1</td>
                    <td data-label="Name">1</td>
                    <td data-label="Quantity">1</td>
                    <td data-label="Price">1</td>
                </tr>
                <tr>
                    <td data-label="Code">1</td>
                    <td data-label="Name">1</td>
                    <td data-label="Quantity">1</td>
                    <td data-label="Price">1</td>
                </tr>
                <tr>        
                    <td colSpan="2">Total</td>
                    <td colSpan="3" className="total-price">1000</td>
                </tr>
            </tbody>
            </table>
                </div>
        </div>
        </div>
        )}
        </div>
    )
}
