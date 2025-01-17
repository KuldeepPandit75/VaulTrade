import * as cheerio from 'cheerio';
import axios from 'axios';

const uri="https://groww.in"

export const getStocks=async(req,res)=>{
    try {
        const companies = [];
    
        await axios.get(`${uri}/stocks/filter?page=0&size=10&sortType=ASC`)
        .then((response)=>{
            const htmlString = response.data;
            
            const $ = cheerio.load(htmlString);
            
            
            // Iterate over each table row (`<tr>`) and extract the data.
            $('tr').each((index, element) => {
                const companyName = $(element).find('.st76SymbolName').text().trim();
                const marketPrice = $(element).find('.st76CurrVal').text().trim();
                const priceChange = $(element).find('.bodySmallHeavy').text().trim();
                const closePrice = $(element).find('.contentPrimary.st76Pad16').first().text().trim();
                const marketCap = $(element).find('.contentPrimary.st76Pad16').last().text().trim();
                const companyLink= $(element).find('a').attr('href');
                // let companyLogo;
                // if(index!=0){
                //     let uri2=`${uri}${companyLink}`;
                //     axios.get(uri2)
                //     .then((soloCompRes)=>{
                //         const $1=cheerio.load(soloCompRes.data);
                //         $1('noscript').each((index1,element1)=>{
                //             if(index1!=0){

                //                 const $2=cheerio.load(element1.children[0].data);
                //                 $2('img').each((idx,ele)=>{
                //                     console.log(ele.attribs);
                //                 })
                //             }
                            
                //         })
                //     })
                // }
                
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
            
            console.log(companies);
            return res.status(200).send(companies);
    
        })
    } catch (error) {
        
        return res.status(500).json({msg:"error getting stocks data"})
    }


    
}