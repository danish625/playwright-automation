require('dotenv').config();

const envParams = {
  baseUrl: process.env.BASE_URL,
  testUserEmail: process.env.TEST_USER_EMAIL,
  testUserPassword: process.env.TEST_USER_PASSWORD,
  loginEndpoint: process.env.LOGIN_ENDPOINT || '/api/login',
  searchEndpoint: process.env.SEARCH_ENDPOINT || '/api/search',
};

module.exports = { envParams };
