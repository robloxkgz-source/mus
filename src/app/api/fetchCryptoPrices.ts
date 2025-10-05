// src/app/api/fetchCryptoPrices.ts

const API_KEY = 'CG-FrU3sD7ijoJNKTNUxxd8Ztw3';

const coinIds = [
  'bitcoin',
  'ethereum',
  'binancecoin', // ← добавлено
  'bitcoin-cash',
  'litecoin',
  'solana',
  'dogecoin',
];


export async function fetchCryptoPrices() {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds.join(',')}&vs_currencies=usd&include_24hr_change=true`,
      {
        headers: {
          'x-cg-demo-api-key': API_KEY,
        },
      }
    );

    if (!res.ok) throw new Error('Ошибка API CoinGecko');

    const data = await res.json();

    // Преобразуем в формат:
    // {
    //   bitcoin: { price: '$43,000', mark: '+2.5%' }
    // }

    const result: {
      [id: string]: { price: string; mark: string; change: number };
    } = {};

    for (const id of coinIds) {
      const coin = data[id];
      const change = coin.usd_24h_change;
      const mark = `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;

      result[id] = {
        price: `$${coin.usd.toLocaleString()}`,
        mark,
        change,
      };
    }

    return result;
  } catch (error) {
    console.error('Ошибка при получении цен:', error);
    return null;
  }
}
