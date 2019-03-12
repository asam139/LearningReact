const apiHost = 'https://bakesaleforgood.com';

export default {
  async fetchInitialDeals() {
    try {
      let response = await fetch(
        apiHost + '/api/deals',
      );
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }
};