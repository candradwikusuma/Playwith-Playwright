class MarketplacePage {
  constructor(page) {
    this.page = page
    this.titleItem = page.locator(".card-body b")
    this.homeButton = page.locator(`[routerlink="/dashboard/"]`)
    this.addButton = page.locator(".btn.w-10.rounded")
    this.cart = page.locator(`[routerlink="/dashboard/cart"] label`)
    this.getToast = page.locator(".ng-tns-c31-3.ng-star-inserted")
    this.products = page.locator(".card-body");
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

  async addItemWithProductName(productName) {
    await this.page.locator(".card-body b").first().waitFor();
    const titles = await this.page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await this.products.count();
    for (let i = 0; i < count; ++i) {
      if (await this.products.nth(i).locator("b").textContent() === productName) {
        //add to cart
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }

    await this.page.locator("[routerlink*='cart']").click();
  }

}
module.exports = MarketplacePage