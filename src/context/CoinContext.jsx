import {createContext, useEffect, useState} from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    const API_KEY = 'CG-6ejoPj9EsdgrUzvi74pFYJaX'

    const [allCoin, setAllCoin] = useState([]);
    const [pinnedCoins, setPinnedCoins] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    })

    // Load pinned coins from localStorage on component mount
    useEffect(() => {
        const savedPinnedCoins = localStorage.getItem('pinnedCoins');
        if (savedPinnedCoins) {
            setPinnedCoins(JSON.parse(savedPinnedCoins));
        }
    }, []);

    // Save pinned coins to localStorage whenever pinnedCoins changes
    useEffect(() => {
        localStorage.setItem('pinnedCoins', JSON.stringify(pinnedCoins));
    }, [pinnedCoins]);

    const fetchAllCoin = async () => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': API_KEY}
        };

        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllCoin(response))
            .catch(err => console.error(err));
    }

    const togglePinCoin = (coin) => {
        setPinnedCoins(prevPinned => {
            const isAlreadyPinned = prevPinned.some(pinnedCoin => pinnedCoin.id === coin.id);

            if (isAlreadyPinned) {
                // Remove from pinned
                return prevPinned.filter(pinnedCoin => pinnedCoin.id !== coin.id);
            } else {
                // Add to pinned
                return [...prevPinned, coin];
            }
        });
    }

    const isPinned = (coinId) => {
        return pinnedCoins.some(coin => coin.id === coinId);
    }

    useEffect(() => {
        fetchAllCoin();
    }, [currency])

    const contextValue = {
        allCoin,
        currency,
        setCurrency,
        API_KEY,
        pinnedCoins,
        togglePinCoin,
        isPinned
    }

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;



