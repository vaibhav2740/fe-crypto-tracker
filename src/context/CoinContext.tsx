import React, { createContext, useEffect, useState, ReactNode } from "react";

export interface Currency {
    name: string;
    symbol: string;
}

export interface Coin {
    id: string;
    name: string;
    symbol: string;
    image: string;
    market_cap_rank: number;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
}

interface CoinContextProps {
    allCoin: Coin[];
    currency: Currency;
    setCurrency: React.Dispatch<React.SetStateAction<Currency>>;
    API_KEY: string;
    pinnedCoins: Coin[];
    togglePinCoin: (coin: Coin) => void;
    isPinned: (coinId: string) => boolean;
}

export const CoinContext = createContext<CoinContextProps>({} as CoinContextProps);

const CoinContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const API_KEY = "CG-6ejoPj9EsdgrUzvi74pFYJaX";

    const [allCoin, setAllCoin] = useState<Coin[]>([]);
    const [pinnedCoins, setPinnedCoins] = useState<Coin[]>([]);
    const [currency, setCurrency] = useState<Currency>({
        name: "usd",
        symbol: "$",
    });

    useEffect(() => {
        const savedPinnedCoins = localStorage.getItem("pinnedCoins");
        if (savedPinnedCoins) {
            setPinnedCoins(JSON.parse(savedPinnedCoins));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("pinnedCoins", JSON.stringify(pinnedCoins));
    }, [pinnedCoins]);

    const fetchAllCoin = async () => {
        const options = {
            method: "GET",
            headers: { accept: "application/json", "x-cg-demo-api-key": API_KEY },
        };

        fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
            options
        )
            .then((response) => response.json())
            .then((response) => setAllCoin(response))
            .catch((err) => console.error(err));
    };

    const togglePinCoin = (coin: Coin) => {
        setPinnedCoins((prevPinned) => {
            const isAlreadyPinned = prevPinned.some((pinnedCoin) => pinnedCoin.id === coin.id);
            if (isAlreadyPinned) {
                return prevPinned.filter((pinnedCoin) => pinnedCoin.id !== coin.id);
            } else {
                return [...prevPinned, coin];
            }
        });
    };

    const isPinned = (coinId: string) => {
        return pinnedCoins.some((coin) => coin.id === coinId);
    };

    useEffect(() => {
        fetchAllCoin();
        // eslint-disable-next-line
    }, [currency]);

    const contextValue: CoinContextProps = {
        allCoin,
        currency,
        setCurrency,
        API_KEY,
        pinnedCoins,
        togglePinCoin,
        isPinned,
    };

    return <CoinContext.Provider value={contextValue}>{children}</CoinContext.Provider>;
};

export default CoinContextProvider;

