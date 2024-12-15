class OrderSummaryPage {
  constructor(page) {
    this.page = page
    this.orderIdSummary = page.locator(`[class="col-text -main"]`)
    this.orderEmailSummary = page.locator('[class="address"] p')
    this.orderEmailAddressSummary = page.locator('[class="address"] p')
  }
  async showOrderIdSummary() {

    return await this.orderIdSummary.textContent();


  }
  async showOrderEmailSummary() {

    let text = await this.orderEmailSummary.first().textContent()
    return text ? text.trim() : '';
  }
  async showOrderEmailAddressSummary() {

    let text = await this.orderEmailAddressSummary.nth(2).textContent()
    return text ? text.trim() : '';
  }
}
module.exports = OrderSummaryPage