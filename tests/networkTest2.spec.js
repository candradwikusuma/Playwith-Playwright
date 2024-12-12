const { test, expect, request } = require('@playwright/test')
const LoginPage = require('../pages/loginPage.spec')
const MaketplacePage = require('../pages/marketplacePage.spec')
const CartPage = require('../pages/cartPage.spec')
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


  test.only("Security test request intercept", async ({ page }) => {
    const email = "anshika@gmail.com";

    await page.addInitScript(value => {
      window.localStorage.setItem('token', value)
    }, token)

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
      async route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=67590a3ee2b5443b1fee888a' })
    )
    await page.locator("button:has-text('View')").first().click()
    await page.pause()
    expect(await page.locator("p.blink_me").textContent()).toBe("You are not authorize to view this order")

  })
})

