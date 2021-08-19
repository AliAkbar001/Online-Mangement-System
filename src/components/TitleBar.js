import React from 'react';
import { IconContext } from "react-icons";
import { IoNotificationsCircleSharp } from "react-icons/io5";

export default function TitleBar() {
    return (
        <div className="title-bar">
            <IconContext.Provider value={{ className:"icons title-bar-icons"}}>
                <span></span>
                <h2>Title Here</h2>
                <div  className="notification-icon">
                <IoNotificationsCircleSharp size="2.5rem"/>
                </div>
            </IconContext.Provider>
        </div>
    )
}
