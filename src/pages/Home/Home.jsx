import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {
  const {allCoin, currency, pinnedCoins, togglePinCoin, isPinned} = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');

  const inputHandler = (event) => {
    setInput(event.target.value);
    if(event.target.value === ""){
      setDisplayCoin(allCoin);
    }
  }

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coins);
  }

  const handlePinToggle = (event, coin) => {
    event.preventDefault(); // Prevent navigation when clicking pin button
    event.stopPropagation();
    togglePinCoin(coin);
  }

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin])

  return (
      <div className='home'>
        <div className="hero">
          <h1>Search your <br/> Favourite Crypto</h1>
          <p>Sign up to explore more features about the app.</p>
          <form onSubmit={searchHandler}>
            <input onChange={inputHandler} list='coinlist' value={input} type="text" placeholder='Search crypto..' required/>
            <datalist id='coinlist'>
              {allCoin.map((item, index) => (<option key={index} value={item.name}/>))}
            </datalist>
            <button type="submit">Search</button>
          </form>
        </div>

        {/* Pinned Coins Section */}
        {pinnedCoins.length > 0 && (
            <div className="pinned-section">
              <h2>📌 Pinned Cryptocurrencies</h2>
              <div className="crypto-table pinned-table">
                <div className="table-layout">
                  <p>#</p>
                  <p>Coins</p>
                  <p>Price</p>
                  <p style={{textAlign:"center"}}>24H Change</p>
                  <p className='market-cap'>Market Cap</p>
                  <p>Action</p>
                </div>
                {
                  pinnedCoins.map((item, index) => (
                      <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                        <p>{item.market_cap_rank}</p>
                        <div>
                          <img src={item.image} alt="" />
                          <p>{item.name + " - " + item.symbol}</p>
                        </div>
                        <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                        <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
                          {Math.floor(item.price_change_percentage_24h * 100) / 100}
                        </p>
                        <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
                        <button
                            className="pin-button pinned"
                            onClick={(e) => handlePinToggle(e, item)}
                            title="Unpin"
                        >
                          📌
                        </button>
                      </Link>
                  ))
                }
              </div>
            </div>
        )}

        {/* All Coins Section */}
        <div className="all-coins-section">
          <h2>All Cryptocurrencies</h2>
          <div className="crypto-table">
            <div className="table-layout">
              <p>#</p>
              <p>Coins</p>
              <p>Price</p>
              <p style={{textAlign:"center"}}>24H Change</p>
              <p className='market-cap'>Market Cap</p>
              <p>Action</p>
            </div>
            {
              displayCoin.slice(0,10).map((item, index) => (
                  <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                    <p>{item.market_cap_rank}</p>
                    <div>
                      <img src={item.image} alt="" />
                      <p>{item.name + " - " + item.symbol}</p>
                    </div>
                    <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                    <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
                      {Math.floor(item.price_change_percentage_24h * 100) / 100}
                    </p>
                    <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
                    <button
                        className={`pin-button ${isPinned(item.id) ? 'pinned' : 'unpinned'}`}
                        onClick={(e) => handlePinToggle(e, item)}
                        title={isPinned(item.id) ? "Unpin" : "Pin"}
                    >
                      {isPinned(item.id) ? '📌' : '📍'}
                    </button>
                  </Link>
              ))
            }
          </div>
        </div>
      </div>
  )
}

export default Home

