import React, { useState } from 'react';
import { BsFillBarChartFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillSetting} from "react-icons/ai";
import { FaFileInvoiceDollar,FaMoneyBillAlt} from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import  Home  from "./Home";
import BillRecords from './BillRecords';
import AllSales from "./AllSales";
import AddProduct from"./AddProduct";
import ManageProducts from "./ManageProducts";
import Logout from './Logout';

export default function Menubar() {
    const [changePages, setChangePages] = useState(<Home/>);
    const [menuChange, setMenuChange] = useState("menu-hide");
    const [dataWidth, setDataWidth] = useState("data-width");
    const [menubarList, setMenubarList] = useState("menubar-list");
  
    function changePage(e) {
        if(e==="Home"){
            setChangePages(<Home/>);
        }
        if(e==="BillRecords"){
            setChangePages(<BillRecords/>);
        }
        if(e==="ManageProducts"){
            setChangePages(<ManageProducts/>);
        }
        if(e==="AddProduct"){
            setChangePages(<AddProduct/>);
        }
        if(e==="AllSales"){
            setChangePages(<AllSales/>);
        }
        if(e==="Logout"){
            setChangePages(<Logout/>); 
        }   
        menuToggle("sidebar");  
    }

    function menuToggle(e){
      if((menuChange==="menu-show")&&(dataWidth===null)){
        setMenuChange("menu-hide");
        setDataWidth("data-width");
        setMenubarList("menubar-list");
      }else if(e==="sidebar"){
        setMenuChange("menu-hide");
      }
      else{
          setMenuChange("menu-show");
          setDataWidth(null);
          setMenubarList(null);
      }
    }
    return (
    <div>
        <div  className={"menubar " + menuChange}>
        <div className={ menuChange }>
            <IconContext.Provider value={{className:"icons menubar-icons", size:"1.5rem"}}>
            <h2 className="menubar-title" onClick={()=>menuToggle()} >
                <AiFillLeftCircle size="2rem"/>
                <span className="menubar-title-test">Dashboard</span>
            </h2>
            <ul className={ menubarList }>
                <li onClick={()=>changePage("Home")}>
                    <FaMoneyBillAlt/>
                    <span>Billing</span>
                </li>
                <li onClick={()=>changePage("BillRecords")}>
                    <FaFileInvoiceDollar/>
                    <span>Bill Records</span>
                </li>
                <li onClick={()=>changePage("ManageProducts")}>
                    <AiFillSetting/>
                    <span>Manage Products</span>
                </li>
                <li onClick={()=>changePage("AddProduct")}>
                    <IoIosAddCircleOutline/>
                    <span>Add New Product</span>
                </li>
                <li onClick={()=>changePage("AllSales")}>
                    <BsFillBarChartFill/>
                    <span>All Sales</span>
                </li>
                <li onClick={()=>changePage("Logout")}>
                    <RiLogoutBoxFill/>
                    <span> Logout</span>
                </li>
            </ul>
            </IconContext.Provider>
        </div>
        </div>
        <div className={"data " + dataWidth}>
            {changePages}
        </div>
    </div>
    )
}
