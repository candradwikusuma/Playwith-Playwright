const { test, expect } = require('@playwright/test')
const LoginPage = require('../../pages/loginPage.spec')
const MaketplacePage = require('../../pages/marketplacePage.spec')
const CartPage = require('../../pages/cartPage.spec');
const PaymentPage = require('../../pages/paymentPage.spec');
const SuccessPage = require('../../pages/successPage.spec');
const HeaderComponent = require('../../pages/headerComponent.spec');
const MyOrderPage = require('../../pages/myOrderPage.spec');
const OrderSummaryPage = require('../../pages/orderSummaryPage.spec');
const email = "anshika@gmail.com";
const productName = 'ZARA COAT 3';
const password = "Iamking@000"
const BASE_URL = 'https://rahulshettyacademy.com/client'
const country = 'Indonesia'


test.describe("Cart", () => {
  test("with multiple Select should be success", async ({ page }) => {
    const loginPage = new LoginPage(page)
    const marketPage = new MaketplacePage(page)
    const cartPage = new CartPage(page)
    await page.goto(BASE_URL)
    await loginPage.login("candradwikusum07@gmail.com", "Candra12345")
    await expect(marketPage.homeButton).toBeVisible()
    let amountItem = 3
    await multipleSelect(page, marketPage, cartPage, amountItem)


  })

  test.only("with dynamicly find the product from list", async ({ page }) => {
    const loginPage = new LoginPage(page)
    const marketPage = new MaketplacePage(page)
    const cartPage = new CartPage(page)
    const paymentPage = new PaymentPage(page)
    const successPage = new SuccessPage(page)
    const headerComponent = new HeaderComponent(page)
    const myOrderPage = new MyOrderPage(page)
    const orderSummary = new OrderSummaryPage(page)

    //Login
    await page.goto(BASE_URL);
    await loginPage.login(email, password)
    //Marketplace
    await marketPage.addItemWithProductName(productName)
    //Cart
    await cartPage.showList()
    const bool = await cartPage.titleFirstCart(productName)
    console.log(bool);
    expect(bool).toBeTruthy();
    await cartPage.doCheckout()
    //Payment
    await expect(paymentPage.itemTitle.first()).toBeVisible()
    await paymentPage.searchCountryAndSelect("ind", "Indonesia")
    expect(paymentPage.placeholderEmail.first()).toHaveText(email);
    await paymentPage.submitPayment()
    //Success Page
    await expect(successPage.successMessage).toHaveText(" Thankyou for the order. ");
    const orderId = await successPage.showOrderIdText()
    console.log(orderId);

    //myOrder
    await headerComponent.goToMyOrder()
    await myOrderPage.findOrderIdAndSelect(orderId)
    //orderSummary
    expect(orderId.includes(await orderSummary.showOrderIdSummary())).toBeTruthy();
    // expect(orderId.includes(orderIdSummary)).toBeTruthy();

    expect(email.includes(await orderSummary.showOrderEmailSummary())).toBeTruthy();
    expect(email.includes(await orderSummary.showOrderEmailAddressSummary())).toBeTruthy();


  })
})

const multipleSelect = async (page, marketPage, cartPage, amountItem,) => {
  for (let item = 0; item < amountItem; item++) {
    await marketPage.selectItem(item)
  }

  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  const valueCart = await marketPage.itemCartCount()

  const amountCart = parseInt(valueCart)
  await marketPage.cart.click()
  expect(amountCart).toBe(amountItem)
  expect(await cartPage.cartTitle.textContent()).toBe("My Cart")
}

