import React from 'react';
import { BsFillBarChartFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillSetting} from "react-icons/ai";
import { FaFileInvoiceDollar,FaMoneyBillAlt} from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function Menubar() {
    return (
        <div className="menubar">
            <IconContext.Provider value={{className: "menu-icons", size:"1.5rem"}}>
            <h2>Dashboard <AiFillLeftCircle size="2rem"/></h2>
            <ul>
                <li><FaMoneyBillAlt/> Billing</li>
                <li><FaFileInvoiceDollar/> Bill Records</li>
                <li><AiFillSetting/> Manage Products</li>
                <li><IoIosAddCircleOutline/>Add New Product</li>
                <li><BsFillBarChartFill/> All Sales</li>
                <li><RiLogoutBoxFill/> Logout</li>
            </ul>
            </IconContext.Provider>
        </div>
    )
}
