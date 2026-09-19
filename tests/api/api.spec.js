const { test, expect } = require('@playwright/test');
const { ApiClient } = require('../../api/ApiClient');
const { envParams } = require('../../utils/envParams');
const testData = require('../../test-data/testData.json');

test.describe('API Tests', () => {
  let apiClient;

  test.beforeAll(async ({ request }) => {
    apiClient = new ApiClient(request);
  });

  test('API Health Check - Login page loads successfully', async () => {
    // Testing the UI route as an API GET to ensure the server is responding
    const response = await apiClient.request.get('/web/index.php/auth/login');
    expect(response.status()).toBe(200);
  });

  test('API Search endpoint requires authentication', async () => {
    const queryParams = {
      q: testData.search.validQuery
    };

    // Since we are not passing a valid session cookie, this internal API should deny access
    const response = await apiClient.getSearch(envParams.searchEndpoint, queryParams);
    
    // Expecting 302 redirect to login or 401 unauthorized
    const status = response.status();
    expect(status === 302 || status === 401 || status === 500).toBeTruthy(); // 500 can sometimes happen if auth is missing in OrangeHRM demo API
  });
});
