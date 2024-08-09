const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeSite(alliance, faction) {
	const url = `https://warcrier.net/docs/warbands/${alliance}/${faction}/`;
	const { data } = await axios.get(url);
	
    const $ = cheerio.load(data);

    var results = [];
    const cheerioResults = [];

    $('div.theme-doc-markdown').each((i, elem) => {
		const cards = $(elem).find('div.fighter-card');
		cheerioResults.push({ cards });
    });
    cheerioResults.forEach((element) => results = element)
    return cheerioResults
}

const alliance = "chaos";
const faction = "skaven";
var elements = [];
    scrapeSite(alliance, faction).then(result => {
        result.forEach((element) => {
            elements.push(element)
        });
        console.log(elements.indexOf('length:52'))
        }).catch(err => console.log(err));
