const { test, expect } = require("@playwright/test")

test("playwrigth special locators", async ({ page }) => {

  await page.goto('https://rahulshettyacademy.com/angularpractice/')
  const count = 1
  await page.getByLabel("Check me out if you Love IceCreams!").click()
  await page.getByLabel("Employed").check()
  await page.getByLabel("Gender").selectOption("Male")
  await page.getByPlaceholder("Password").fill("candra12345")
  await page.getByRole("button", { name: "Submit" }).click()
  await expect(page.getByText(" The Form has been submitted successfully!.")).toBeVisible()
  await page.getByRole("link", { name: "Shop" }).click()
  await expect(page.locator("app-navbar a.navbar-brand")).toBeVisible()
  await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button", { name: "Add " }).click()
  expect(page.locator(".nav-link.btn.btn-primary")).toBeVisible()


})
