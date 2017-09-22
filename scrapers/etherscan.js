import cheerio from 'cheerio';
import rp from 'request-promise';

export default async function etherscan() {
  const res = await rp('https://etherscan.io');
  console.log(res);
}
