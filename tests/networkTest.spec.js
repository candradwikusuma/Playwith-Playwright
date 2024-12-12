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


test.describe("Cart", () => {


  test.only("with dynamicly find the product from list", async ({ page }) => {
    const email = "anshika@gmail.com";

    await page.addInitScript(value => {
      window.localStorage.setItem('token', value)
    }, token)

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator(".card-body b").first().waitFor();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
      async route => {
        //intercept
        //get response
        const response = await page.request.fetch(route.request())
        let body = JSON.stringify(fakePayload)
        route.fulfill({
          response,
          body
        })
      }
    )
    await page.locator("button[routerlink*='myorders']").click();
    // await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator(".mt-4").textContent());
    await expect(page.locator(".offset-md-4")).toBeVisible()
    expect(await page.locator(".mt-4").textContent()).toBe(" You have No Orders to show at this time. Please Visit Back Us ")
  })
})

