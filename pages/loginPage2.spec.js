class LoginPage2 {
  constructor(page) {
    this.page = page
    this.username = page.locator("#username")
    this.password = page.locator("#password")
    this.dropdown = page.locator("select.form-control")
    this.radioButton = page.locator(".radiotextsty")
    this.termOfUse = page.locator("#terms")
    this.blinkText = page.locator(`[href*="documents-request"]`)
  }


  async selectDropdown(ops) {
    await this.dropdown.selectOption(ops)
    // this.dropdown = this.page.locator(`select.form-control [value="${ops}"]`)
  }

  async selectRadioButton(ops) {
    // await this.radioButton.last().click
    await this.page.locator(`.customradio [value="${ops}"]`).click()
  }

  async login(username, password, options, opsRadio) {
    await this.username.fill(username)
    await this.password.fill(password)
    await this.selectDropdown(options)
    // await this.selectRadioButton()
    await this.selectRadioButton(opsRadio)
  }
}

module.exports = LoginPage2