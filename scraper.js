const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;

const getUrlsByAuthor = async () =>  {
  const url = 'https://www.brainyquote.com/authors';
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);
  const authorsUrl = [];
  $('a.bq_on_link_cl').each((i, element) => {
    const authorName = $(element).find('span').text();
    const authorUrl = `${url}${$(element).attr('href')}`;
    authorsUrl.push({ author: authorName, url: authorUrl });
  });
  return authorsUrl;
}

const getQuotesByUrl = async ({ author, url }) => {
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);
  const quotes = [];
  $('a.b-qt').each((i, element) => {
    quotes.push(element.children[0].data);
  });

  return { author, quotes };
}

const fetchAuthors = async () => {
  const response = await getUrlsByAuthor();
  fs.writeFile('quotes/authors.json',
      JSON.stringify(response),
      (err, data) => {
    if (err) throw err;
    console.log('fetched authors');
  });
};

const fetchQuotes = async () => {
  const authorsData = await fs.readFile('quotes/authors.json', 'utf-8');
  const quotesData = await fs.readFile('quotes/quotes.json', 'utf-8');
  if (!authorsData) throw new Error('querying completed');
  let authorsByUrl = JSON.parse(authorsData);
  const requestLimit = authorsByUrl.length >= 5 ? 5 : authorsByUrl.length;
  const quotesByAuthor = quotesData ? JSON.parse(quotesData) : [];

  const newQuotesByAuthor = await Promise.all(authorsByUrl.slice(0, requestLimit)
    .map((urlByAuthor) => getQuotesByUrl(urlByAuthor)));

  quotesByAuthor.push(...newQuotesByAuthor);

  fs.writeFile('quotes/quotes.json',
      JSON.stringify(quotesByAuthor),
      (err, data) => {
    if (err) throw err;
    console.log('fetched quotes');
  });

  authorsByUrl = authorsByUrl.filter(({ author }) => {
    return !quotesByAuthor
      .map((item) => item.author)
      .includes(author);
  });

  fs.writeFile('quotes/authors.json',
      JSON.stringify(authorsByUrl),
      (err, data) => {
    if (err) throw err;
    console.log('removed queried authors');
  });
};

(async () => {
  const arg = process.argv.splice(2, 1)[0];
  if (arg === 'quotes') await fetchQuotes()
  else if (arg === 'authors') await fetchAuthors();
})();
