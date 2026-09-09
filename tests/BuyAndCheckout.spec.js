const{expect,test} = require('@playwright/test')

const cart = require("../pages/Cart")
const Checkout = require("../pages/CheckOut")

const address_details = JSON.parse(JSON.stringify(require("../Test_Data/address_details.json")))
const address = address_details[0]
const card_details = JSON.parse(JSON.stringify(require("../Test_Data/Card_Details.json")))
const i = card_details[0]

test("Product Buy and Checkout", async ({page}) =>
{

    await page.goto("https://sauce-demo.myshopify.com/",{waitUntil:'commit'})
    const Cart = new cart(page)
    await Cart.product()
    await Cart.Emptycart()
    const price = await Cart.cart()

    const checkout = new Checkout(page)
    await checkout.cartpage(price)

    await checkout.checkoutpage
    (
        address.email,
        address.country,
        address.firstname,
        address.lastname,
        address.city,
        address.state,
        address.postalcode,
        address.address
    )
        
    await checkout.CardDetails(i.cardnumber,i.expirydate,i.securitycode)

})





