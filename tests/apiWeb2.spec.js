const { test, expect } = require('@playwright/test')
let webContext
let email


test.describe("Cart", () => {
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    email = "anshika@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    (await context).storageState({ path: 'state.json' })
    webContext = await browser.newContext({ storageState: 'state.json' })
  })
  test("new page with storageState global", async () => {

    const productName = 'ZARA COAT 3';
    const page = await webContext.newPage()
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
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


  })
})


