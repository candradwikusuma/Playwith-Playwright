class HeaderComponent {
  constructor(page) {
    this.page = page
    this.myOrder = page.locator("button[routerlink*='myorders']")
  }
  async goToMyOrder() {
    await this.myOrder.click()
  }
}
module.exports = HeaderComponent