const fs = require('fs').promises;
const path = require('path');
const { quotes } = require('');

class QuoteService {
  static async getAllQuotes() {
    const quotesPath = path.join(__dirname, '..', '..', 'quotes', 'quotes.json');
    const file = await fs.readFile(quotesPath);
    return JSON.parse(file);
  }

  static async getQuotesByAuthor(_author) {
    const quotes = await this.getAllQuotes();
    return quotes.filter(({ author }) => author === _author);
  }

  static async getRandomQuote() {
    const quotes = await this.getAllQuotes();
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  static async getQuoteById(id) {
    // TODO:
    return id;
  }
}

module.exports = QuoteService;
