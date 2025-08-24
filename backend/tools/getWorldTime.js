function getWorldTime({ timezone }) {
    try {
        const date = new Date();
        // Use Intl.DateTimeFormat for robust timezone handling without external libraries
        const timeString = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).format(date);

        return `The current time in ${timezone} is ${timeString}.`;
    } catch (error) {
        // This will catch invalid timezone strings
        return `Invalid timezone provided: ${timezone}. Example of a valid timezone is 'America/New_York'.`;
    }
}

const worldTimeDeclaration = {
    name: 'getWorldTime',
    description: 'Get the current time for a given IANA timezone.',
    parameters: {
        type: 'OBJECT',
        properties: {
            timezone: {
                type: 'STRING',
                description: 'The IANA timezone name, e.g., "America/New_York", "Europe/London", or "Asia/Kolkata"'
            }
        },
        required: ['timezone']
    }
};

export { getWorldTime, worldTimeDeclaration };
