const { test, expect, request } = require('@playwright/test')
const LoginPage = require('../pages/loginPage.spec')
const MaketplacePage = require('../pages/marketplacePage.spec')
const CartPage = require('../pages/cartPage.spec')
const Login = require('../utils/login')
const Order = require('../utils/order')

let token
let orderId
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
  test("with multiple Select should be success", async ({ page }) => {
    const loginPage = new LoginPage(page)
    const marketPage = new MaketplacePage(page)
    const cartPage = new CartPage(page)
    await page.goto("https://rahulshettyacademy.com/client")
    await loginPage.login("candradwikusum07@gmail.com", "Candra12345")
    await expect(marketPage.homeButton).toBeVisible()
    let amountItem = 3
    await multipleSelect(page, marketPage, cartPage, amountItem)


  })

  test.only("with dynamicly find the product from list", async ({ page }) => {
    const email = "anshika@gmail.com";

    await page.addInitScript(value => {
      window.localStorage.setItem('token', value)
    }, token)

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); i++) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
        await rows.nth(i).locator("button").first().click();
        break;
      }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    const orderIdSummary = await page.locator('[class="col-text -main"]').textContent()
    const orderEmailSummary = await page.locator('[class="address"] p').first().textContent()
    const orderEmailAddressSummary = await page.locator('[class="address"] p').nth(2).textContent()
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
    expect(orderId.includes(orderIdSummary)).toBeTruthy();

    expect(email.includes(orderEmailSummary.trim())).toBeTruthy();
    expect(email.includes(orderEmailAddressSummary.trim())).toBeTruthy();
    // await page.pause()
  })
})

const multipleSelect = async (page, marketPage, cartPage, amountItem,) => {
  for (let item = 0; item < amountItem; item++) {
    await marketPage.selectItem(item)
  }

  await page.waitForLoadState('networkidle');
  // await page.waitForTimeout(1000);
  const valueCart = await marketPage.itemCartCount()

  const amountCart = parseInt(valueCart)
  await marketPage.cart.click()
  expect(amountCart).toBe(amountItem)
  expect(await cartPage.cartTitle.textContent()).toBe("My Cart")
}

