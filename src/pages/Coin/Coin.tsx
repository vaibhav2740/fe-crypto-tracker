import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext, Coin } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: { large: string };
  market_cap_rank: number;
  market_data: {
    current_price: { [key: string]: number };
    market_cap: { [key: string]: number };
    high_24h: { [key: string]: number };
    low_24h: { [key: string]: number };
  };
}

const CoinPage: React.FC = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [historicalData, setHistoricalData] = useState<any>(null);
  const { currency, API_KEY } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: { accept: "application/json", "x-cg-demo-api-key": API_KEY },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
        .then((response) => response.json())
        .then((response) => setCoinData(response))
        .catch((err) => console.error(err));
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: "GET",
      headers: { accept: "application/json", "x-cg-demo-api-key": API_KEY },
    };

    fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        options
    )
        .then((response) => response.json())
        .then((response) => setHistoricalData(response))
        .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
    // eslint-disable-next-line
  }, [currency]);

  if (coinData && historicalData) {
    return (
        <div className="coin">
          <div className="coin-name">
            <img src={coinData.image.large} alt="" />
            <p>
              <b>
                {coinData.name} ({coinData.symbol.toUpperCase()})
              </b>
            </p>
          </div>
          <div className="coin-chart">
            <LineChart historicalData={historicalData} />
          </div>

          <div className="coin-info">
            <ul>
              <li>Crypto Market Rank</li>
              <li>{coinData.market_cap_rank}</li>
            </ul>
            <ul>
              <li>Current Price</li>
              <li>
                {currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}
              </li>
            </ul>
            <ul>
              <li>Market cap</li>
              <li>
                {currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}
              </li>
            </ul>
            <ul>
              <li>24 Hour high</li>
              <li>
                {currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}
              </li>
            </ul>
            <ul>
              <li>24 Hour low</li>
              <li>
                {currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}
              </li>
            </ul>
          </div>
        </div>
    );
  } else {
    return (
        <div className="spinner">
          <div className="spin"></div>
        </div>
    );
  }
};

export default CoinPage;


