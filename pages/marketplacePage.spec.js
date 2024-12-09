class MarketplacePage {
  constructor(page) {
    this.page = page
    this.titleItem = page.locator(".card-body b")
    this.homeButton = page.locator(`[routerlink="/dashboard/"]`)
    this.addButton = page.locator(".btn.w-10.rounded")
    this.cart = page.locator(`[routerlink="/dashboard/cart"] label`)
    this.getToast = page.locator(".ng-tns-c31-3.ng-star-inserted")
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

  async selectItem(n) {
    return this.addButton.nth(n).click()
  }

  async itemCartCount() {
    return this.cart.textContent()
  }

}
module.exports = MarketplacePage