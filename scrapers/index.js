import etherscan from './etherscan';
import csv from 'fast-csv';
import fs from 'fs';

(async () => {
  console.log('Now Scraping Etherscan...');
  const csvStream = csv.createWriteStream({ headers: true });
  const writableStream = fs.createWriteStream('./data/etherscan.csv');

  writableStream.on('finish', () => console.log('done'));
  csvStream.pipe(writableStream);
  for (let i = 1; i < 20000; i++) {
    await etherscan(i, csvStream);
    console.log(`Ran on Page ${i}`);
  }
  csvStream.end();
})();
