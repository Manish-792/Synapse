async function getWeather({ city }) {
    if (!process.env.OPENWEATHER_API_KEY) {
        return "Weather API Key is not configured.";
    }
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`);
        const data = await response.json();
        if (data.cod !== 200) {
            return `Error fetching weather: ${data.message}`;
        }
        const weatherInfo = {
            location: data.name,
            temperature: `${data.main.temp}°C`,
            feels_like: `${data.main.feels_like}°C`,
            description: data.weather[0].description,
            humidity: `${data.main.humidity}%`
        };
        return JSON.stringify(weatherInfo); // Return a structured string
    } catch (error) {
        return `Failed to connect to the weather service.`;
    }
}

const weatherDeclaration = {
    name: 'getWeather',
    description: "Get the current weather for a specific city.",
    parameters: {
        type: 'OBJECT',
        properties: {
            city: {
                type: 'STRING',
                description: 'The city name, e.g., "London" or "Tokyo"',
            },
        },
        required: ['city']
    }
};

export { getWeather, weatherDeclaration };
