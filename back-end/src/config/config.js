require('dotenv').config();

const config = {
    app: {
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'development',
    },
    db: {
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
    },
    // thirdPartyApis: {
    //     googleDriveApiKey: process.env.GOOGLE_DRIVE_API_KEY,
    //     zoomApiKey: process.env.ZOOM_API_KEY,
    //     zoomApiSecret: process.env.ZOOM_API_SECRET,
    // },
    // mail: {
    //     service: process.env.MAIL_SERVICE || 'gmail',
    //     user: process.env.MAIL_USER,
    //     pass: process.env.MAIL_PASS,
    // },
    // jwt: {
    //     secret: process.env.JWT_SECRET || 'your_jwt_secret',
    //     expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    // },
    // logging: {
    //     level: process.env.LOGGING_LEVEL || 'info',
    // },
    // Add more configurations as needed
};

module.exports = config;
