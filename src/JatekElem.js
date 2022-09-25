import React from "react";
import './JatekElem.css';
function JatekElem(props){
    
     return(
            <React.Fragment>
                <div className="jatekElem" onClick={props.kattintas}>
                <p>{props.adat.allapot}</p>
                </div>

            </React.Fragment>
     )   
    
}
export default JatekElem