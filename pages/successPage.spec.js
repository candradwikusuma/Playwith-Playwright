class SuccessPage {
  constructor(page) {
    this.page = page
    this.successMessage = page.locator(".hero-primary")
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted")
  }
  async showOrderIdText() {
    return await this.orderId.textContent()
  }
}
module.exports = SuccessPage