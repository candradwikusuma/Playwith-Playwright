const { test, expect } = require("@playwright/test")
const LoginPage = require("../pages/loginPage.spec")
const MarketPage = require("../pages/marketplacePage.spec")
const LoginPage2 = require("../pages/loginPage2.spec")

test("testing context", async ({ browser }) => {
  const context = await browser.newContext()
  const page = await context.newPage()
  const loginPage = new LoginPage(page)
  const marketPage = new MarketPage(page)
  await page.goto('https://rahulshettyacademy.com/client')
  await loginPage.login("candradwikusum07@gmail.com", "Candra12345")

  // await marketPage.titleItem.first().waitFor()
  await expect(marketPage.titleItem.nth(1)).toBeVisible()
  console.log((await marketPage.showAllItem()));

})

test("testing login with false", async ({ page }) => {

  const loginPage = new LoginPage(page)

  await page.goto('https://rahulshettyacademy.com/client')
  await loginPage.login("candradwikusuma07@gmail.com", "Candra2345")
  expect(await loginPage.getToastErrorMessage()).toBe("Incorrect email or password.")

})

test("testing page", async ({ page }) => {

  await page.goto('https://google.com/')
  console.log(await page.title());
  await expect(page).toHaveTitle("Google")
})




test("UI Control", async ({ page }) => {
  const login = new LoginPage2(page)
  const status = "user"
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
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

test("Control New Page", async ({ browser }) => {
  const context = await browser.newContext()
  const page = await context.newPage()
  const login = new LoginPage2(page)
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
  const documentLink = page.locator(`[href*="documents-request"]`)
  // const [newPage,newPage2] = await Promise.all([ when more then 1 new tab or child tab
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    // login.blinkText.click()
    documentLink.click()
  ])

  let text = await newPage.locator(".red").textContent()
  let arrayText = text.split("@")
  let domain = arrayText[1].split(" ")[0]
  console.log(domain);
  console.log(text);

  await login.username.fill(domain)
  // await page.pause()
})