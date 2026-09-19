const { BasePage } = require('./BasePage');

class SearchPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    // OrangeHRM sidebar search locators
    this.searchInput = page.locator('input[placeholder="Search"]');
    this.searchResults = page.locator('.oxd-main-menu-item');
  }

  async searchFor(query) {
    await this.searchInput.fill(query);
    // OrangeHRM filters instantly on type, giving it a brief moment to update DOM
    await this.page.waitForTimeout(1000); 
  }

  async getSearchResultsCount() {
    return await this.searchResults.count();
  }

  async getFirstResultText() {
    return await this.searchResults.first().textContent();
  }
}

module.exports = { SearchPage };
