class MarketplacePage {
  constructor(page) {
    this.page = page
    this.titleItem = page.locator("h5")
  }
  async gettitleItem() {
    return this.titleItem.first()
  }
  async showItem(index) {
    return await this.titleItem.nth(index).textContent()
  }

  async showAllItem() {
    return await this.titleItem.allTextContents()
  }
}
module.exports = MarketplacePage