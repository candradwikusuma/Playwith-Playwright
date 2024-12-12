const { test, expect, request } = require('@playwright/test')

const LoginPage2 = require("../pages/loginPage2.spec")
const Login = require('../utils/login')
const Order = require('../utils/order')

let token
let orderId
let fakePayload = { "data": [], "message": "No Orders" }
test.beforeAll(async () => {
  const apiContext = await request.newContext()
  const bodyLogin = {
    "userEmail": "anshika@gmail.com",
    "userPassword": "Iamking@000"
  }
  const login = new Login(apiContext, bodyLogin)

  token = await login.getToken()
  const bodyOrder = { "orders": [{ "country": "Indonesia", "productOrderedId": "6581ca979fd99c85e8ee7faf" }] }
  const order = new Order(apiContext, token, bodyOrder)
  orderId = await order.createOrder(bodyOrder)
})


test.describe("Security test ", () => {


  test("Security test request intercept", async ({ page }) => {
    const email = "anshika@gmail.com";

    await page.addInitScript(value => {
      window.localStorage.setItem('token', value)
    }, token)

    // await page.route("**/*.{jpg,png,jpeg}", route => route.abort())
    await page.route("https://rahulshettyacademy.com/api/ecom/product/get-all-products", async route => await route.abort())
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.pause()
    await page.locator(".card-body b").first().waitFor();
    // await page.locator("button[routerlink*='myorders']").click();

    // await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    //   async route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=67590a3ee2b5443b1fee888a' })
    // )
    // await page.locator("button:has-text('View')").first().click()
    // await page.pause()
    // expect(await page.locator("p.blink_me").textContent()).toBe("You are not authorize to view this order")

  })
  test.only("UI Control", async ({ page }) => {
    const login = new LoginPage2(page)
    const status = "user"
    // await page.route("**/*.{jpg,png,jpeg}", route => route.abort())
    // await page.route("**/*.css", route => route.abort())
    page.on("request", request => console.log(request.url()));
    page.on("response", response => console.log(response.url(), response.status()));


    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    // await page.pause()
    await login.login("candra", "dwi", "Student", "user")
    if (status === "user") {
      await page.locator("#okayBtn").click()
      console.log(await login.radioButton.last().isChecked());
      await expect(login.radioButton.last()).toBeChecked()
    }
    await login.termOfUse.click()
    await expect(login.termOfUse).toBeChecked()
    await login.termOfUse.uncheck()
    expect(await login.termOfUse.isChecked()).toBeFalsy()

    await expect(login.blinkText).toHaveAttribute("class", "blinkingText")

    // await page.pause()
  })
})

