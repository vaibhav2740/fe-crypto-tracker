import { createContext, useEffect, useState, ReactNode } from "react";

export interface Coin {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    price_change_percentage_24h: number;
}

interface CoinContextType {
    allCoin: Coin[];
    pinnedCoins: Coin[];
    togglePinCoin: (coin: Coin) => void;
    isPinned: (coinId: string) => boolean;
    API_KEY: string;
}

export const CoinContext = createContext<CoinContextType | undefined>(undefined);

interface CoinContextProviderProps {
    children: ReactNode;
}

const CoinContextProvider = ({ children }: CoinContextProviderProps) => {
    const API_KEY = 'CG-6ejoPj9EsdgrUzvi74pFYJaX';
    const [allCoin, setAllCoin] = useState<Coin[]>([]);
    const [pinnedCoins, setPinnedCoins] = useState<Coin[]>([]);

    useEffect(() => {
        const savedPinnedCoins = localStorage.getItem('pinnedCoins');
        if (savedPinnedCoins) {
            setPinnedCoins(JSON.parse(savedPinnedCoins));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('pinnedCoins', JSON.stringify(pinnedCoins));
    }, [pinnedCoins]);

    const fetchAllCoin = async () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': API_KEY }
        };

        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`, options)
            .then(response => response.json())
            .then(response => setAllCoin(response))
            .catch(err => console.error(err));
    }

    const togglePinCoin = (coin: Coin) => {
        setPinnedCoins(prevPinned => {
            const isAlreadyPinned = prevPinned.some(pinnedCoin => pinnedCoin.id === coin.id);
            if (isAlreadyPinned) {
                return prevPinned.filter(pinnedCoin => pinnedCoin.id !== coin.id);
            } else {
                return [...prevPinned, coin];
            }
        });
    }

    const isPinned = (coinId: string) => {
        return pinnedCoins.some(coin => coin.id === coinId);
    }

    useEffect(() => {
        fetchAllCoin();
    }, []);

    const contextValue: CoinContextType = {
        allCoin,
        pinnedCoins,
        togglePinCoin,
        isPinned,
        API_KEY
    }

    return (
        <CoinContext.Provider value={contextValue}>
            {children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;