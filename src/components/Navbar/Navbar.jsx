import React, { useContext } from 'react'
import './Navbar.css'
import arrow_icon from '../../assets/arrow_icon.png'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const {setCurrency} = useContext(CoinContext)

    const currencyHandler = (event)=>{
        switch (event.target.value){
            case "usd": {
                setCurrency({name: "usd", symbol: "$"});
                break;
            }
            case "eur": {
                setCurrency({name: "eur", symbol: "€"});
                break;
            }
            case "inr": {
                setCurrency({name: "inr", symbol: "₹"});
                break;
            }
            default : {
                setCurrency({name: "usd", symbol: "$"});
                break;
            }
        }
    }

    return (
        <div className='navbar'>
            <div className="app-header">
                <h1>Crypto-Tracker</h1>
                <select onChange={currencyHandler}>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="inr">INR</option>
                </select>
            </div>
            <button>Sign up <img src={arrow_icon} alt="" /></button>
        </div>
    )
}

export default Navbar

