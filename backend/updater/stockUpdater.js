import axios from "axios";
import Stock from "../models/stocks.js";
import * as cheerio from 'cheerio';

export const updateStockInDB = async () => {

    const uri = "https://groww.in"
    await Stock.deleteMany({});

    try {
        for(let i=0;i<10;i++){

            let companies = [];
            let url = `${uri}/stocks/filter?page=${i}&size=500`;
            
            await axios.get(url, {
                headers: {
                    'Cache-Control': 'no-cache',
                    Pragma: 'no-cache',
                    Expires: '0',
                },
            })
            .then((response) => {
                const htmlString = response.data;
                
                const $ = cheerio.load(htmlString);
                
                
                // Iterate over each table row (`<tr>`) and extract the data.
                $('tr').each((index, element) => {
                    const companyName = $(element).find('.st76SymbolName').text().trim();
                    const marketPrice = $(element).find('.st76CurrVal').text().trim();
                    const priceChange = $(element).find('.bodySmallHeavy').text().trim();
                    const closePrice = $(element).find('.contentPrimary.st76Pad16').first().text().trim();
                    const marketCap = $(element).find('.contentPrimary.st76Pad16').last().text().trim();
                    const companyLink = $(element).find('a').attr('href');
                    
                    // Ensure that all necessary fields are found before pushing to the result array
                    if (companyName && marketPrice && priceChange && closePrice && marketCap) {
                        companies.push({
                            name: companyName,
                            marketPrice: marketPrice,
                            priceChange: priceChange,
                            closePrice: closePrice,
                            marketCap: marketCap,
                            companyLink: companyLink,
                        });
                    }
                });
            })
            
            await Stock.insertMany(companies);
        }
    } catch (err) {
        console.log(err.message);
    }
}

updateStockInDB();
setInterval(updateStockInDB, 86400000);