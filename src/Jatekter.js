import React from 'react';
import JatekElem from './JatekElem';
import Urlap from './Urlap';
import './JatekElem.css';
class Jatekter extends React.Component {
  constructor() {
    super()
    this.state = {
      elemek: [
        { allapot: "" },
        { allapot: "" },
        { allapot: "" },
        { allapot: "" },
        { allapot: "" },
        { allapot: "" },
        { allapot: "" },
        { allapot: "" },
        { allapot: "" }
      ],
      kovetkezolepes: "O",
      kovetkezoJatekos: "",
      jatekos1: "",
      jatekos2: "",
      nyertes: "",
      jatek: false
    }
  }
  ujJatek = (event) => {
    this.setState({
      elemek: [{ allapot: "" },
      { allapot: "" },
      { allapot: "" },
      { allapot: "" },
      { allapot: "" },
      { allapot: "" },
      { allapot: "" },
      { allapot: "" },
      { allapot: "" }
      ],
      jatek: true,
      nyertes: "",
      kovetkezoJatekos: ""
    })
    event.preventDefault()
  }
  inputhandleChange = (event) => {
    const statName = event.target.name//ez lesz a játékos1,játékos2
    this.setState({
      [statName]: event.target.value //ez amit beírok az ürlapba
    })
    console.log(statName, event.target.value)
  }
  submitHandleClick = (event) => {
    event.preventDefault()
    this.setState({
      jatek: true,
    })
  }
  kattintas = (id) => {
    let kovetkezo = ""
    const elemekMasolata = [...this.state.elemek]

    if (this.state.jatek) {
      if (this.state.elemek[id].allapot === "") {
        elemekMasolata[id].allapot = this.state.kovetkezolepes
        if (this.state.kovetkezolepes === "X") {
          kovetkezo = "O"
          this.setState({
            kovetkezoJatekos: this.state.jatekos2
          })
        }
        else {
          kovetkezo = "X"
          this.setState({
            kovetkezoJatekos: this.state.jatekos1
          })
        }
        this.setState({ elemek: elemekMasolata, kovetkezolepes: kovetkezo })
      }
    }
    this.ellenorzes()
  }
  vizzintesEllenorzes = () => {
    let ellString = ""
    for (let i = 0; i < this.state.elemek.length; i++) {
      ellString += this.state.elemek[i].allapot
      if (i % 3 === 2) {
        ellString += "|"
      }
    }
    return ellString
  }
  fuggolegesEllenorzes = () => {
    let ellString = ""
    for (let i = 0; i < 3; i++) {
      ellString += this.state.elemek[i].allapot + this.state.elemek[i + 3].allapot + this.state.elemek[i + 6].allapot + "|"

    }
    return ellString
  }
  atloEllenorzes = () => {
    let ellString = ""
    ellString += this.state.elemek[0].allapot + this.state.elemek[4].allapot + this.state.elemek[8].allapot + "|"
    ellString += this.state.elemek[2].allapot + this.state.elemek[4].allapot + this.state.elemek[6].allapot + "|"
    return ellString
  }
  ellenorzes = () => {
    let ell = this.vizzintesEllenorzes() + this.fuggolegesEllenorzes() + this.atloEllenorzes()
    if (ell.indexOf("XXX") >= 0) {
      this.setState({
        nyertes: this.state.jatekos1,
        jatek: false,
        kovetkezoJatekos: ""
      })
    } else if (ell.indexOf("OOO") >= 0) {
      this.setState({
        nyertes: this.state.jatekos2,
        jatek: false,
        kovetkezoJatekos: ""
      })
    }
  }
  render() {

    return (
      <React.Fragment>
        <div className="jatekTerTarolo">
          <Urlap change={this.inputhandleChange} submitChange={this.submitHandleClick} jatekos1={this.state.jatekos1} jatekos2={this.state.jatekos2} mehetGomb={this.ujJatek}></Urlap>
          <label>Következő Játékos: {this.state.kovetkezoJatekos}</label>
          <label>Nyertes: {this.state.nyertes}</label>
          <div className='jatekElemTarolo'>

            {this.state.elemek.map((elem, id) => {
              return <JatekElem adat={elem} key={id} kattintas={() => this.kattintas(id)}></JatekElem>

            })}
          </div>
          <input type="button" value="Új játék" className='ujJatekGomb' onClick={this.ujJatek}></input>
        </div>


      </React.Fragment>

    );
  }
}

export default Jatekter;
