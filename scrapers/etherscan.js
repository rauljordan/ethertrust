import cheerio from 'cheerio';
import rp from 'request-promise';

export default async function etherscan(index, csvStream) {
  const url = index === 1 ? 'https://etherscan.io/txs' : `https://etherscan.io/txs?p=${index}`;
  const res = await rp(url);
  const $ = cheerio.load(res);

  $('.table').find('tbody').find('tr').map(function (el) {
    const cols = $(this).find('td').toArray();

    const hash = $(cols[0]).find('a').text();
    const block = $(cols[1]).find('a').text();
    const age = $(cols[2]).find('span').text().trim();

    const fromText = $(cols[3]).find('a').text();
    const fromHref = $(cols[3]).find('a').attr('href');

    // Checks if money is sent to a contract or not
    const isContract = $(cols[5]).find('i').length;
    const toText = $(cols[5]).find('a').text();
    const toHref = $(cols[5]).find('a').attr('href');

    const value = $(cols[6]).text();
    const gasCost = $(cols[7]).text();

    const row = {
      hash,
      block,
      age,
      from_text: fromText,
      from_href: fromHref,
      is_contract: isContract,
      to_text: toText,
      to_href: toHref,
      value,
      gas_cost: gasCost,
    };

    csvStream.write(row);

  });

}
