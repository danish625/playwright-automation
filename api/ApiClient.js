class ApiClient {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    this.request = request;
  }

  async postLogin(endpoint, credentials) {
    const response = await this.request.post(endpoint, {
      data: credentials,
    });
    return response;
  }

  async getSearch(endpoint, queryParams) {
    const response = await this.request.get(endpoint, {
      params: queryParams,
    });
    return response;
  }
}

module.exports = { ApiClient };
