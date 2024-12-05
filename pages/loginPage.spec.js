class LoginPage {
  constructor(page) {
    this.page = page
    this.usernameField = page.locator("#userEmail")
    this.passwordField = page.locator("#userPassword")
    this.loginButton = page.locator("#login")
    this.getToastMessage = page.locator("#toast-container")
  }

  async login(username, password) {
    await this.usernameField.fill(username)
    await this.passwordField.fill(password)
    await this.loginButton.click()
  }

  async getToastErrorMessage() {
    return this.getToastMessage.innerText()
  }

}

module.exports = LoginPage