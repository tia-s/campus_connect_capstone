require('dotenv').config();

// module.exports = {
//   database: {
//     url: process.env.DB_URL,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD
//   },
//   logging: {
//     level: process.env.LOG_LEVEL || 'info',
//     filePath: process.env.LOG_FILE_PATH || '/var/log/app.log'
//   },
//   security: {
//     sessionSecret: process.env.SESSION_SECRET,
//     corsOrigin: process.env.CORS_ORIGIN || '*'
//   },
//   server: {
//     port: process.env.PORT || 3000,
//     hostname: process.env.HOSTNAME || 'localhost'
//   },
//   thirdPartyServices: {
//     apiKey: process.env.API_KEY
//   }
// };

module.exports = {
  server: {
    port: process.env.PORT || 3000,
    hostname: process.env.HOSTNAME || 'localhost'
  },
};



