import React from "react";

function Urlap(props) {
    
    return (
        <form onSubmit={props.submitChange}>
          <label>Játékos1 neve:</label>
            <input type="text" name="jatekos1" value={props.jatekos1} onChange={props.change}/>
            <label>Játékos2 neve:</label>
            <input type="text" name="jatekos2" value={props.jatekos2}  onChange={props.change}/>
            <input type="submit" value="Mehet" onClick={props.mehetGomb}></input>
        </form>
      )
}
export default Urlap;