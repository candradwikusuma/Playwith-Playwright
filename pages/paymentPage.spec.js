class PaymentPage {
  constructor(page) {
    this.page = page
    this.itemTitle = page.locator(".item__title")
    this.placeholderCountry = page.locator("[placeholder*='Country']")
    this.dropdown = page.locator(".ta-results")
    this.placeholderEmail = page.locator(".user__name [type='text']")
    this.submitButton = page.locator(".action__submit")
  }

  async searchCountryAndSelect(countryCode, country) {
    await this.placeholderCountry.pressSequentially(countryCode)
    const dropdown = this.dropdown
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === ` ${country}`) {
        await dropdown.locator("button").nth(i).click();
        break;
      }
    }
  }
  async submitPayment() {
    await this.submitButton.click()
  }

}
module.exports = PaymentPage


