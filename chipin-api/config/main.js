var config = {
    development: {
        //url to be used in link generation
        url: 'http://nutrap.nexus.home',
        //mongodb connection settings
        database: {
            host:       'mongo.nexus.home',
            port:       '27017',
            db:         'nutrap',
            user:       'apiuser',
            password:   'password1234'
        },
        //server details
        server: {
            host: '127.0.0.1',
            port: '3000'
        },
        secret: 'thisisasecret'
    },
    production: {
        //url to be used in link generation
        url: 'http://example.com',
        //mongodb connection settings
        database: {
            host:       process.env.DB_HOST,
            port:       process.env.DB_PORT,
            db:         process.env.DB_NAME,
            user:       process.env.DB_USER,
            password:   process.env.DB_PASSWORD
        },
        //server details
        server: {
            host: process.env.WEB_HOST,
            port: process.env.WEB_PORT
        },
        secret: process.env.JWT_SECRET
    }
};

module.exports = config;