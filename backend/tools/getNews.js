async function getNews({ topic }) {
    if (!process.env.NEWS_API_KEY) {
        return "News API Key is not configured.";
    }

    try {
        // Encoding the topic handles spaces and special characters correctly
        const url = `https://newsapi.org/v2/top-headlines?q=${encodeURIComponent(topic)}&apiKey=${process.env.NEWS_API_KEY}&pageSize=5`;
        const response = await fetch(url);

        // This is a more reliable way to check for HTTP errors (like 401 Unauthorized)
        if (!response.ok) {
            const errorData = await response.json(); // Try to get the error message from the API
            return `Error from News API: ${response.statusText} - ${errorData.message}`;
        }

        const data = await response.json();

        // Format the articles for a clean response
        const headlines = data.articles.map(article => ({
            title: article.title,
            source: article.source.name
        }));

        return JSON.stringify(headlines);
    } catch (error) {
        console.error("News API fetch error:", error); // Log the actual error for debugging
        return 'Failed to connect to the news service.';
    }
}

const newsDeclaration = {
    name: 'getNews',
    // This description is now extremely clear and direct
    description: "Fetches the latest news headlines. Use this for any news-related query. The 'topic' parameter can be ANY subject the user asks about, such as 'AI', 'politics', 'Tesla', 'sports', etc.",
    parameters: {
        type: 'OBJECT',
        properties: {
            topic: {
                type: 'STRING',
                description: 'The subject to search for news on. Can be any topic.',
            },
        },
        required: ['topic']
    }
};

export { getNews, newsDeclaration };
