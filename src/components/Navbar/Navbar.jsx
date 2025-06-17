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

// import React, { useContext } from 'react'
// import './Navbar.css'
// import { CoinContext } from '../../context/CoinContext'
//
// const Navbar = () => {
//     const { setCurrency } = useContext(CoinContext)
//
//     const currencyHandler = (event) => {
//         switch (event.target.value){
//             case "usd":
//                 setCurrency({name: "usd", symbol: "$"})
//                 break
//             case "eur":
//                 setCurrency({name: "eur", symbol: "€"})
//                 break
//             case "inr":
//                 setCurrency({name: "inr", symbol: "₹"})
//                 break
//             default:
//                 setCurrency({name: "usd", symbol: "$"})
//                 break
//         }
//     }
//
//     return (
//         <div className='navbar' style={{flexDirection: 'column', alignItems: 'center', gap: '10px', borderBottom: '2px solid #3c3c3c', padding: '30px 0 10px 0'}}>
//             <h1 style={{color: '#fff', fontWeight: 700, fontSize: '2rem', margin: 0}}>Crypto Tracker</h1>
//             <select onChange={currencyHandler} style={{marginTop: '10px', padding: '5px 8px', borderRadius: '6px', border: '2px solid white', background: 'transparent', color: 'white'}}>
//                 <option value="usd">USD</option>
//                 <option value="eur">EUR</option>
//                 <option value="inr">INR</option>
//             </select>
//         </div>
//     )
// }
//
// export default Navbar

// import React, { useContext } from 'react'
// import './Navbar.css'
// import logo from '../../assets/logo.png'
// import arrow_icon from '../../assets/arrow_icon.png'
// import { CoinContext } from '../../context/CoinContext'
// import { Link } from 'react-router-dom'
//
// const Navbar = () => {
//     const { setCurrency } = useContext(CoinContext);
//
//     const currencyHandler = (event) => {
//         switch (event.target.value) {
//             case "usd":
//                 setCurrency({ name: "usd", symbol: "$" });
//                 break;
//             case "eur":
//                 setCurrency({ name: "eur", symbol: "€" });
//                 break;
//             case "inr":
//                 setCurrency({ name: "inr", symbol: "₹" });
//                 break;
//             default:
//                 setCurrency({ name: "usd", symbol: "$" });
//                 break;
//         }
//     };
//
//     return (
//         <div className="navbar">
//             <h1 className="navbar-title">Crypto Tracker</h1>
//             <div className="nav-currency">
//                 <label htmlFor="currency-select">Currency:</label>
//                 <select id="currency-select" onChange={currencyHandler}>
//                     <option value="usd">USD</option>
//                     <option value="eur">EUR</option>
//                     <option value="inr">INR</option>
//                 </select>
//             </div>
//         </div>
//     );
// };
// export default Navbar;
//
// // const Navbar = () => {
// //
// //   const {setCurrency} = useContext(CoinContext)
// //
// //   const currencyHandler = (event)=>{
// //     switch (event.target.value){
// //       case "usd": {
// //         setCurrency({name: "usd", symbol: "$"});
// //         break;
// //       }
// //       case "eur": {
// //         setCurrency({name: "eur", symbol: "€"});
// //         break;
// //       }
// //       case "inr": {
// //         setCurrency({name: "inr", symbol: "₹"});
// //         break;
// //       }
// //       default : {
// //         setCurrency({name: "usd", symbol: "$"});
// //         break;
// //       }
// //     }
// //   }
// //
// //   return (
// //     <div className='navbar'>
// //        {/*<Link to={'/'}>*/}
// //        {/*  <img src={logo} alt="" className='logo' />*/}
// //        {/* </Link>*/}
// //        {/* <ul>*/}
// //        {/* <Link to={'/'}> <li>Home</li></Link>*/}
// //        {/*     <li>Features</li>*/}
// //        {/*     <li>Pricing</li>*/}
// //        {/*     <li>Blog</li>*/}
// //        {/* </ul>*/}
// //          <ul>
// //          <Link to={'/'}> <li>Select Currency type:</li></Link>
// //          </ul>
// //         <div className="nav-right">
// //             <select onChange={currencyHandler}>
// //                 <option value="usd">USD</option>
// //                 <option value="eur">EUR</option>
// //                 <option value="inr">INR</option>
// //             </select>
// //             {/*<button>Sign up <img src={arrow_icon} alt="" /></button>*/}
// //         </div>
// //     </div>
// //   )
// // }
// //
// // export default Navbar
