const { test, expect } = require('@playwright/test')
const LoginPage = require('../../pages/loginPage.spec')
const MaketplacePage = require('../../pages/marketplacePage.spec')
const CartPage = require('../../pages/cartPage.spec')
const { addAbortSignal } = require('stream')

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
    const loginPage = new LoginPage(page)
    const marketPage = new MaketplacePage(page)
    const cartPage = new CartPage(page)
    const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
        //add to cart
        await products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }

    await page.locator("[routerlink*='cart']").click();
    //await page.pause();

    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    await expect(page.locator(".item__title").first()).toBeVisible()
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " Indonesia") {
        await dropdown.locator("button").nth(i).click();
        break;
      }
    }

    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {
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
    await page.pause()

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

