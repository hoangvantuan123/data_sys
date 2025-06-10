export const appConfig = {
    port: parseInt(process.env.PORT ?? '8818', 10),
    globalPrefix: 'api',
    corsOptions: {
        origin: [
            '*',
            'http://localhost:3000',
            'http://localhost:5173'

        ],
        methods: 'GET,POST,PUT,DELETE',
        credentials: true,
    },
};
