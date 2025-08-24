// Import all individual tool functions and their declarations
import { sum, sumDeclaration } from './sum.js';
import { prime, primeDeclaration } from './prime.js';
import { getCryptoPrice, cryptoDeclaration } from './getCryptoPrice.js';
import { getWeather, weatherDeclaration } from './getWeather.js';
import { getNews, newsDeclaration } from './getNews.js';
import { getWorldTime, worldTimeDeclaration } from './getWorldTime.js';

// Create and export availableTools object that maps tool names to their functions
export const availableTools = {
    sum: sum,
    prime: prime,
    getCryptoPrice: getCryptoPrice,
    getWeather: getWeather,
    getNews: getNews,
    getWorldTime: getWorldTime,
};

// Create and export allDeclarations array containing all declaration objects
export const allDeclarations = [
    sumDeclaration,
    primeDeclaration,
    cryptoDeclaration,
    weatherDeclaration,
    newsDeclaration,
    worldTimeDeclaration
];
