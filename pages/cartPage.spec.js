class CartPage {
  constructor(page) {
    this.page = page
    this.cartTitle = page.locator(".heading.cf h1")
  }
}

module.exports = CartPage