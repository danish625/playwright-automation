const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { envParams } = require('../../utils/envParams');
const testData = require('../../test-data/testData.json');

test.describe('UI Login Functionality', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
  });

  test('Successful Login with valid credentials', async ({ page }) => {
    const email = envParams.testUserEmail || testData.login.validUser.email;
    const password = envParams.testUserPassword || testData.login.validUser.password;

    await loginPage.login(email, password);
    
    // Assert successful login navigates to dashboard
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('Failed Login with invalid credentials', async () => {
    await loginPage.login(testData.login.invalidUser.email, testData.login.invalidUser.password);
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid credentials');
  });
});
