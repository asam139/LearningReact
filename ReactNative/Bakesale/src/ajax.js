const apiHost = 'https://bakesaleforgood.com';

export default {
  async fetchInitialDeals() {
    try {
      const response = await fetch( apiHost + '/api/deals');
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  },

  async fetchDealDetail(dealId) {
    try {
      const response = await fetch( apiHost + '/api/deals/' + dealId);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }
};