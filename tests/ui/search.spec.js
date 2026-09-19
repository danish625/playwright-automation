const { test, expect } = require('@playwright/test');
const { SearchPage } = require('../../pages/SearchPage');
const { LoginPage } = require('../../pages/LoginPage');
const { envParams } = require('../../utils/envParams');
const testData = require('../../test-data/testData.json');

test.describe('UI Search Functionality', () => {
  let searchPage;

  test.beforeEach(async ({ page }) => {
    // OrangeHRM search is inside the app, so we must login first
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login(
      envParams.testUserEmail || testData.login.validUser.email,
      envParams.testUserPassword || testData.login.validUser.password
    );
    await expect(page).toHaveURL(/.*dashboard/);

    searchPage = new SearchPage(page);
  });

  test('Search with valid query returns results', async () => {
    await searchPage.searchFor(testData.search.validQuery);
    
    const count = await searchPage.getSearchResultsCount();
    expect(count).toBeGreaterThan(0);
    
    const firstResultText = await searchPage.getFirstResultText();
    expect(firstResultText.toLowerCase()).toContain(testData.search.validQuery.toLowerCase());
  });

  test('Search with invalid query returns no results', async () => {
    await searchPage.searchFor(testData.search.invalidQuery);
    
    const count = await searchPage.getSearchResultsCount();
    expect(count).toBe(0);
  });
});
