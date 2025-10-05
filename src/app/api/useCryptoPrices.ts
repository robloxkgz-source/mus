import { useEffect, useState } from 'react';

export function useCryptoPrices() {
  const [prices, setPrices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd'
        );
        const data = await res.json();
        setPrices({
          bitcoin: data.bitcoin.usd,
          ethereum: data.ethereum.usd,
        });
      } catch (error) {
        console.error('Ошибка при загрузке цен:', error);
      }
    }

    fetchPrices();
  }, []);

  return prices;
}