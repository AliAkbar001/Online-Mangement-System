import React, { useState } from 'react';
import { BsFillBarChartFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillSetting} from "react-icons/ai";
import { FaFileInvoiceDollar,FaMoneyBillAlt} from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import  Home  from "./Home";

export default function Menubar(props) {
    const [changePages, setChangePages] = useState(<Home/>);
    const [menuChange, setMenuChange] = useState("menu-hide");
    const [dataWidth, setDataWidth] = useState("data-width");
    const [menubarList, setMenubarList] = useState("menubar-list");
  
    function menuToggle(){
      if((menuChange==="menu-show")&&(dataWidth===null)){
      setMenuChange("menu-hide");
      setDataWidth("data-width");
      setMenubarList("menubar-list");
      }else{
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
                <li><FaMoneyBillAlt/><span>Billing</span></li>
                <li><FaFileInvoiceDollar/><span>Bill Records</span></li>
                <li><AiFillSetting/><span>Manage Products</span></li>
                <li><IoIosAddCircleOutline/><span>Add New Product</span></li>
                <li><BsFillBarChartFill/><span>All Sales</span></li>
                <li><RiLogoutBoxFill/><span> Logout</span></li>
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
