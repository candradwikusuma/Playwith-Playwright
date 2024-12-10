class Login {

  constructor(context, bodyLogin) {
    this.context = context
    this.bodyLogin = bodyLogin
  }
  async getToken() {

    const login = await this.context.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: this.bodyLogin })
    // expect((await login).ok()).toBeTruthy()
    // expect(login.status()).toBe(200);
    const loginResponse = await login.json()
    const showResponse = await JSON.stringify(loginResponse, null, 2);

    let token = loginResponse.token
    // console.log(` ${loginResponse}`);
    console.log(`token: ${token}`);
    return token
  }
}
module.exports = Login 