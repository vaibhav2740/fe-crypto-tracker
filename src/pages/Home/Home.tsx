// import React, { useContext, useEffect, useState } from "react";
// import "./Home.css";
// import { CoinContext, Coin } from "../../context/CoinContext";
// import { Link } from "react-router-dom";
//
// const Home: React.FC = () => {
//   const { allCoin, currency, pinnedCoins, togglePinCoin, isPinned } = useContext(CoinContext);
//   const [displayCoin, setDisplayCoin] = useState<Coin[]>([]);
//   const [input, setInput] = useState<string>("");
//
//   const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInput(event.target.value);
//     if (event.target.value === "") {
//       setDisplayCoin(allCoin);
//     }
//   };
//
//   const searchHandler = (event: React.FormEvent) => {
//     event.preventDefault();
//     const coins = allCoin.filter((item) =>
//         item.name.toLowerCase().includes(input.toLowerCase())
//     );
//     setDisplayCoin(coins);
//   };
//
//   const handlePinToggle = (event: React.MouseEvent, coin: Coin) => {
//     event.preventDefault();
//     event.stopPropagation();
//     togglePinCoin(coin);
//   };
//
//   useEffect(() => {
//     setDisplayCoin(allCoin);
//   }, [allCoin]);
//
//   return (
//       <div className="home">
//         <div className="hero">
//           <h1>
//             Search your <br /> Favourite Crypto
//           </h1>
//           <p>Sign up to explore more features about the app.</p>
//           <form onSubmit={searchHandler}>
//             <input
//                 onChange={inputHandler}
//                 list="coinlist"
//                 value={input}
//                 type="text"
//                 placeholder="Search crypto.."
//                 required
//             />
//             <datalist id="coinlist">
//               {allCoin.map((item, index) => (
//                   <option key={index} value={item.name} />
//               ))}
//             </datalist>
//             <button type="submit">Search</button>
//           </form>
//         </div>
//
//         {pinnedCoins.length > 0 && (
//             <div className="pinned-section">
//               <h2>📌 Pinned Cryptocurrencies</h2>
//               <div className="crypto-table pinned-table">
//                 <div className="table-layout">
//                   <p>#</p>
//                   <p>Coins</p>
//                   <p>Price</p>
//                   <p style={{ textAlign: "center" }}>24H Change</p>
//                   <p className="market-cap">Market Cap</p>
//                   <p>Action</p>
//                 </div>
//                 {pinnedCoins.map((item, index) => (
//                     <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
//                       <p>{item.market_cap_rank}</p>
//                       <div>
//                         <img src={item.image} alt="" />
//                         <p>
//                           {item.name} - {item.symbol}
//                         </p>
//                       </div>
//                       <p>
//                         {currency.symbol} {item.current_price.toLocaleString()}
//                       </p>
//                       <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
//                         {Math.floor(item.price_change_percentage_24h * 100) / 100}
//                       </p>
//                       <p className="market-cap">
//                         {currency.symbol} {item.market_cap.toLocaleString()}
//                       </p>
//                       <button
//                           className="pin-button pinned"
//                           onClick={(e) => handlePinToggle(e, item)}
//                           title="Unpin"
//                       >
//                         📌
//                       </button>
//                     </Link>
//                 ))}
//               </div>
//             </div>
//         )}
//
//         <div className="all-coins-section">
//           <h2>Suggestions</h2>
//           <div className="crypto-table">
//             <div className="table-layout">
//               <p>#</p>
//               <p>Coins</p>
//               <p>Price</p>
//               <p style={{ textAlign: "center" }}>24H Change</p>
//               <p className="market-cap">Market Cap</p>
//               <p>Action</p>
//             </div>
//             {displayCoin.slice(0, 10).map((item, index) => (
//                 <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
//                   <p>{item.market_cap_rank}</p>
//                   <div>
//                     <img src={item.image} alt="" />
//                     <p>
//                       {item.name} - {item.symbol}
//                     </p>
//                   </div>
//                   <p>
//                     {currency.symbol} {item.current_price.toLocaleString()}
//                   </p>
//                   <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
//                     {Math.floor(item.price_change_percentage_24h * 100) / 100}
//                   </p>
//                   <p className="market-cap">
//                     {currency.symbol} {item.market_cap.toLocaleString()}
//                   </p>
//                   <button
//                       className={`pin-button ${isPinned(item.id) ? "pinned" : "unpinned"}`}
//                       onClick={(e) => handlePinToggle(e, item)}
//                       title={isPinned(item.id) ? "Unpin" : "Pin"}
//                   >
//                     {isPinned(item.id) ? "📌" : "📍"}
//                   </button>
//                 </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//   );
// };
//
// export default Home;
//
//

import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { CoinContext } from '../../context/CoinContext';
import { Coin } from '../../context/CoinContext'; // Import Coin interface

const Home = () => {
  const context = useContext(CoinContext);

  // Check if context exists before destructuring
  if (!context) {
    return <div>Loading...</div>;
  }

  const { allCoin, pinnedCoins, togglePinCoin, isPinned } = context;

  const [displayCoin, setDisplayCoin] = useState<Coin[]>([]);
  const [input, setInput] = useState('');

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  }

  const searchHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const coins = allCoin.filter((item: Coin) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  }

  const handlePinToggle = (event: React.MouseEvent, coin: Coin) => {
    event.preventDefault();
    event.stopPropagation();
    togglePinCoin(coin);
  }

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
      <div className='home'>
        <div className="hero">
          <h1>Track Your <br/> Favorite Crypto</h1>
          <form onSubmit={searchHandler}>
            <input
                onChange={inputHandler}
                list='coinlist'
                value={input}
                type="text"
                placeholder='Search crypto..'
                required
            />
            <datalist id='coinlist'>
              {allCoin.map((item: Coin, index: number) => (
                  <option key={index} value={item.name}/>
              ))}
            </datalist>
            <button type="submit">Search</button>
          </form>
        </div>

        {pinnedCoins.length > 0 && (
            <div className="pinned-section">
              <h2>📌 Pinned Cryptocurrencies</h2>
              <div className="crypto-table pinned-table">
                <div className="table-layout">
                  <p>#</p>
                  <p>Coins</p>
                  <p>Price</p>
                  <p>Action</p>
                </div>
                {pinnedCoins.map((item: Coin, index: number) => (
                    <div className="table-layout" key={index}>
                      <p>{item.market_cap_rank}</p>
                      <div>
                        <img src={item.image} alt={item.name} />
                        <p>{item.name}</p>
                      </div>
                      <p>${item.current_price.toLocaleString()}</p>
                      <button
                          className="pin-button pinned"
                          onClick={(e) => handlePinToggle(e, item)}
                          title="Unpin"
                      >
                        📌
                      </button>
                    </div>
                ))}
              </div>
            </div>
        )}

        <div className="all-coins-section">
          <h2>All Cryptocurrencies</h2>
          <div className="crypto-table">
            <div className="table-layout">
              <p>#</p>
              <p>Coins</p>
              <p>Price</p>
              <p>Action</p>
            </div>
            {displayCoin.slice(0, 20).map((item: Coin, index: number) => (
                <div className="table-layout" key={index}>
                  <p>{item.market_cap_rank}</p>
                  <div>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                  </div>
                  <p>${item.current_price.toLocaleString()}</p>
                  <button
                      className={`pin-button ${isPinned(item.id) ? 'pinned' : 'unpinned'}`}
                      onClick={(e) => handlePinToggle(e, item)}
                      title={isPinned(item.id) ? "Unpin" : "Pin"}
                  >
                    {isPinned(item.id) ? '📌' : '📍'}
                  </button>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Home;