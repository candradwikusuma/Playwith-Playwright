class Order {
  constructor(context, token, bodyOrder) {
    this.context = context
    this.token = token
    this.bodyOrder = bodyOrder
  }
  async createOrder(bodyOrder) {


    const order = await this.context.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: this.bodyOrder,
        headers: {
          "Authorization": this.token,
          "Content-Type": "application/json"

        },
      }
    )
    // expect((await order).ok()).toBeTruthy()
    // expect(order.status()).toBe(201);
    const orderResponse = await order.json()
    const showOrderResponse = await JSON.stringify(orderResponse, null, 2);
    let orderId = orderResponse.orders[0]
    console.log(orderResponse);
    console.log(orderId);
    return orderId
  }
}
module.exports = Order 