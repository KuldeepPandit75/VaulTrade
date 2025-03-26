import * as cheerio from 'cheerio';
import axios from 'axios';
import Stock from '../models/stocks.js';
import puppeteer from 'puppeteer'

const uri = "https://groww.in"

export const getStocks = async (req, res) => {
    try {
        let companies = [];
        let url = `${uri}/stocks/filter?page=0&size=${Math.floor(Math.random() * 10) + 50}&sortType=ASC`;

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

                return res.status(200).send(companies);

            })
    } catch (error) {

        return res.status(500).json({ msg: "error getting stocks data" })
    }



}

export const getStockData = async (req, res) => {
    const { link } = req.body
    try {
        console.log('sdaf')
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`${uri}${link}`, { waitUntil: "networkidle2" });

        const html = await page.evaluate(() => document.documentElement.outerHTML);

        await browser.close();

        const $ = cheerio.load(html);

        // Extract Stock Name
        const stockName = $(".lpu38Head.truncate.displaySmall").text().trim();

        // Extract Stock Price
        const stockPrice = $(".lpu38Pri.valign-wrapper.false.displayBase").text().trim();

        // Extract Price Change
        const priceChange = $(".lpu38Day.bodyBaseHeavy").text().trim();

        // Extract Stock Image URL
        const stockImage = $(".companyLogo_companyImage__bT0On").attr("src");

        const fundamentals = {};
        $("table.tb10Table tbody tr").each((index, element) => {
            const key = $(element).find(".ft785Head").text().trim();
            const value = $(element).find(".ft785Value").text().trim();
            if (key && value) {
                fundamentals[key] = value;
            }
        });

        // Print extracted data
        const result={
            stockName,
            stockPrice,
            priceChange,
            stockImage,
            companyLink:link,
            fundamentals
        };

        return res.status(200).send(result);


    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ msg: error.message })
    }
}

export const stockSearch = async (req, res) => {
    try {
        console.log('searching')
        let { query } = req.body;
        console.log(query)

        const regex = new RegExp(query, "i"); // Case-insensitive

        const result = await Stock.find({ name: { $regex: regex } });

        res.status(200).send(result)

    } catch (error) {

        return res.status(500).json({ msg: "hello" })
    }
}