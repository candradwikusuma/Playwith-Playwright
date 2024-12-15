class MyOrderPage {
  constructor(page) {
    this.page = page
    this.tableOrder = page.locator("tbody")
    this.rowTable = page.locator("tbody tr");
  }
  async findOrderIdAndSelect(orderId) {
    // const orderId = "675ee775e2b5443b1ff429ff"
    // orderId = String(orderId);
    // const rows = await this.rowTable
    await this.tableOrder.waitFor()
    for (let i = 0; i < await this.rowTable.count(); ++i) {
      const rowOrderId = await this.rowTable.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
        await this.rowTable.nth(i).locator("button").first().click();
        break;
      }
    }
  }


}
module.exports = MyOrderPage