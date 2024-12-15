class CartPage {
  constructor(page) {
    this.page = page
    this.cartTitle = page.locator(".heading.cf h1")
    this.listCart = page.locator("div li")
    this.buttonCheckout = page.locator("text=Checkout")
  }

  async showList() {
    await this.listCart.first().waitFor()
  }
  async titleFirstCart(productName) {
    return this.page.locator(`h3:has-text("${productName}")`).isVisible();
  }

  async doCheckout() {
    this.buttonCheckout.click();
  }
}

module.exports = CartPage