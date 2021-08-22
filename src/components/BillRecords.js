import React,{useState} from 'react';
import Modal from "react-modal";

export default function BillRecords() {
    const [model, setModel] = useState(false);
    return (
        <div className="bill-record">
            <div className="bill-record-top-bar">
            <input type="search" placeholder="Bill Number"/>
            <input type="date"/>
            </div>
            <div className="bill-record-data">
                <div>
                    <h3>Bill Number</h3>
                    <div className="border-line"></div>
                    <h3>Rs 2000</h3>
                </div>
                <div className="bill-record-buttons">
                    <button>VIEW</button>
                    <button>Print</button>
                    <button className="delete-btn">Delete</button>
                </div>
            </div>
            <Modal isOpen={true} onRequestClose={this.closeModal}>

            </Modal>
        </div>
    )
}
