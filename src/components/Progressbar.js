import React from "react";
import Loader from "react-loader-spinner";

export default function Progressbar(props) {
   return (
       <div className="progress-bar"> 
        <Loader type="Puff" color="rgb(34, 89, 134)" height={80} width={80} visible={props.visibility}/>
  </div>);
}